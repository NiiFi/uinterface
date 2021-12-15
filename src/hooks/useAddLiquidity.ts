import { Currency, Percent } from '@niifi/godzilla2-sdk'
import { TransactionResponse } from '@ethersproject/providers'
// import { BigNumber } from '@ethersproject/bignumber'
import { t } from '@lingui/macro'
import { useCallback } from 'react'
import { useActiveWeb3React } from 'hooks/web3'
import { useCurrency } from 'hooks/Tokens'
import { useUserSlippageToleranceWithDefault } from 'state/user/hooks'
import { useDerivedMintInfo, useMintState, useMintActionHandlers } from 'state/mint/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { Field } from 'state/mint/actions'
import { calculateSlippageAmount } from 'utils/calculateSlippageAmount'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { ZERO_PERCENT } from 'constants/misc'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { useV2RouterContract } from 'hooks/useContract'
import ReactGA from 'react-ga4'

export const DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE = new Percent(200, 10_000)

// TODO: set appropriate types
export const addLiquidityAsync = async (
  account: string | null | undefined,
  addTransaction: any,
  allowedSlippage: Percent,
  currencies: any,
  currencyA: any,
  currencyB: any,
  deadline: any,
  error: any,
  noLiquidity: any,
  router: any,
  chainId: any,
  library: any,
  parsedAmounts: any,
  callback?: any
) => {
  if (!chainId || !library || !account || !router || error) return
  const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts

  if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
    return
  }

  const amountsMin = {
    [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
    [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? ZERO_PERCENT : allowedSlippage)[0],
  }

  // let estimate,
  //   method: (...args: any) => Promise<TransactionResponse>,
  //   args: Array<string | string[] | number>,
  //   value: BigNumber | null
  // if (currencyA.isNative || currencyB.isNative) {
  //   const tokenBIsETH = currencyB.isNative
  //   estimate = router.estimateGas.addLiquidityETH
  //   method = router.addLiquidityETH
  //   args = [
  //     (tokenBIsETH ? currencyA : currencyB)?.wrapped?.address ?? '',
  //     (tokenBIsETH ? parsedAmountA : parsedAmountB).quotient.toString(),
  //     amountsMin[tokenBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
  //     amountsMin[tokenBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
  //     account,
  //     deadline.toHexString(),
  //   ]
  //   value = BigNumber.from((tokenBIsETH ? parsedAmountB : parsedAmountA).quotient.toString())
  // } else {
  const estimate = router.estimateGas.addLiquidity
  const method: (...args: any) => Promise<TransactionResponse> = router.addLiquidity
  const args: Array<string | string[] | number> = [
    currencyA?.wrapped?.address ?? '',
    currencyB?.wrapped?.address ?? '',
    parsedAmountA.quotient.toString(),
    parsedAmountB.quotient.toString(),
    amountsMin[Field.CURRENCY_A].toString(),
    amountsMin[Field.CURRENCY_B].toString(),
    account,
    deadline.toHexString(),
  ]
  const value = null
  // }

  // console.log(['addLiquidity', args])

  await estimate(...args, value ? { value } : {}).then((estimatedGasLimit: any) => {
    method(...args, {
      ...(value ? { value } : {}),
      gasLimit: calculateGasMargin(estimatedGasLimit),
    }).then((response) => {
      addTransaction(response, {
        summary: t`Add ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
          currencies[Field.CURRENCY_A]?.symbol
        } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[Field.CURRENCY_B]?.symbol}`,
      })
      ReactGA.event({
        category: 'Pool',
        action: 'Create/Add liquidity',
        label: [
          `${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${currencies[Field.CURRENCY_A]?.symbol}`,
          `${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[Field.CURRENCY_B]?.symbol}`,
        ].join('/'),
      })
      callback && callback()
    })
  })
}

export default function useAddLiquidity(
  currencyTokenOne: Currency | null | undefined,
  currencyTokenTwo: Currency | null | undefined
): {
  addLiquidity: () => void
  currencies: any
  formattedAmounts: any
  onFieldAInput: any
  onFieldBInput: any
  error: any
  approveA: any
  approveB: any
} {
  const { account, chainId, library } = useActiveWeb3React()
  const router = useV2RouterContract()

  const currencyA = useCurrency(
    currencyTokenOne?.symbol === 'ETH' ? currencyTokenOne.symbol : currencyTokenOne?.wrapped?.address
  )
  const currencyB = useCurrency(
    currencyTokenTwo?.symbol === 'ETH' ? currencyTokenTwo.symbol : currencyTokenTwo?.wrapped?.address
  )

  const { independentField, typedValue, otherTypedValue } = useMintState()
  const { dependentField, currencies, parsedAmounts, noLiquidity, error } = useDerivedMintInfo(
    currencyA ?? undefined,
    currencyB ?? undefined
  )

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE)
  const deadline = useTransactionDeadline()
  // console.log([currencyTokenOne, currencyTokenTwo, parsedAmounts[Field.CURRENCY_A], parsedAmounts[Field.CURRENCY_B]])
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], router?.address)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], router?.address)

  const addTransaction = useTransactionAdder()

  const addLiquidity = useCallback(
    () =>
      addLiquidityAsync(
        account,
        addTransaction,
        allowedSlippage,
        currencies,
        currencyA,
        currencyB,
        deadline,
        error,
        noLiquidity,
        router,
        chainId,
        library,
        parsedAmounts
      ),
    [
      account,
      addTransaction,
      allowedSlippage,
      currencies,
      currencyA,
      currencyB,
      deadline,
      error,
      noLiquidity,
      router,
      chainId,
      library,
      parsedAmounts,
    ]
  )

  return {
    addLiquidity,
    currencies,
    formattedAmounts,
    onFieldAInput,
    onFieldBInput,
    error:
      error || (approvalA === 'NOT_APPROVED' && 'A_' + approvalA) || (approvalB === 'NOT_APPROVED' && 'B_' + approvalB),
    approveA: { approvalA, approveACallback },
    approveB: { approvalB, approveBCallback },
  }
}
