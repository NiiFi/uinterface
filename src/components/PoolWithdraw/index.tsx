import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { Token, Currency, Percent, CurrencyAmount } from '@uniswap/sdk-core'
import { Contract } from '@ethersproject/contracts'
import styled from 'styled-components/macro'
import { useWalletModalToggle } from 'state/application/hooks'
import { TransactionResponse } from '@ethersproject/providers'
import { t, Trans } from '@lingui/macro'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import TokenPairInputPanel from 'components/pools/TokenPairInputPanel'
import { TYPE, BaseCurrencyView } from 'theme'
import { PoolInvestPairValues } from 'state/pool/actions'
import { tryParseAmount } from 'state/swap/hooks'
import { ButtonPrimary } from 'components/Button'
import Slider from 'components/Slider'
import useTheme from 'hooks/useTheme'
import useDebouncedChangeHandler from 'hooks/useDebouncedChangeHandler'
import { usePair } from 'hooks/usePairs'
import { useUserSlippageToleranceWithDefault, useEthereumToBaseCurrencyRatesAndApiState } from 'state/user/hooks'
// import { useTokenBalances } from 'state/wallet/hooks'
import { useTotalSupply } from 'hooks/useTotalSupply'
import { Field } from 'state/burn/actions'
import { useInvestmentCalculator } from 'state/pool/hooks'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { useTransactionAdder } from 'state/transactions/hooks'
import { calculateSlippageAmount } from 'utils/calculateSlippageAmount'
import { BigNumber } from '@ethersproject/bignumber'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { useApproveCallback, ApprovalState } from 'hooks/useApproveCallback'
import { usePairContract, useV2RouterContract } from 'hooks/useContract'
import { useLiquidityTokenPermit } from 'hooks/useERC20Permit'
import JSBI from 'jsbi'
import { getContract } from 'utils'
import ERC20_ABI from 'abis/erc20.json'

const UpperSection = styled.div`
  position: relative;
  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1.5rem;
  `}
`

const DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(5, 100)

export default function PoolWithdraw({ currency0, currency1 }: { currency0: Currency; currency1: Currency }) {
  const { account, chainId, library } = useActiveWeb3React()
  const { ethereumToBaseCurrencyRates: rates } = useEthereumToBaseCurrencyRatesAndApiState()
  const [active, setActive] = useState('')
  const [token0Amount, setToken0Amount] = useState('')
  const [token1Amount, setToken1Amount] = useState('')
  const [investmentValue, setInvestmentValue] = useState(0)
  const [withdrawValue, setWithdrawValue] = useState(50)
  const [sliderValue, setSliderValue] = useState(50)
  const { calculateTotalInvestment } = useInvestmentCalculator()
  const balance0 = useCurrencyBalance(account ?? undefined, currency0 ?? undefined)
  const balance1 = useCurrencyBalance(account ?? undefined, currency1 ?? undefined)
  const toggleWalletModal = useWalletModalToggle()
  const handlePairValueChange = useCallback(
    ({ token0, token1 }: PoolInvestPairValues, active) => {
      setActive(active)
      setToken0Amount(token0.value)
      setToken1Amount(token1.value)
    },
    [setActive, setToken0Amount, setToken1Amount]
  )
  const inputAmount0: CurrencyAmount<Currency> | undefined = useMemo(
    () => tryParseAmount(token0Amount, currency0 ?? undefined),
    [currency0, token0Amount]
  )
  const inputAmount1: CurrencyAmount<Currency> | undefined = useMemo(
    () => tryParseAmount(token1Amount, currency1 ?? undefined),
    [currency1, token1Amount]
  )

  const SliderChangeHandler: any = (e: any) => {
    setWithdrawValue(e)
    setSliderValue(e)
    setActive('slider')
  }

  const [tokenA, tokenB] = [currency0?.wrapped, currency1?.wrapped]

  const [innerSliderValue, setDebouncedSliderValue] = useDebouncedChangeHandler(sliderValue, SliderChangeHandler)

  const [, pair] = usePair(currency0, currency1)

  // TODO: check useTokenBalances issue bellow
  const [userLiquidity, setUserLiquidity] = useState<undefined | CurrencyAmount<Token>>()

  useEffect(() => {
    ;(async () => {
      if (!!account && !!library && !!chainId && !!pair?.liquidityToken?.address) {
        const tokenInst = getContract(pair?.liquidityToken?.address, ERC20_ABI, library, account)
        let balance = JSBI.BigInt(0)
        try {
          balance = await tokenInst.balanceOf(account)
          setUserLiquidity(
            CurrencyAmount.fromRawAmount(pair?.liquidityToken, balance ? JSBI.BigInt(balance.toString()) : 0)
          )
        } catch (e) {
          console.log(e)
        }
      }
    })()
  }, [account, library, chainId, pair])

  // const relevantTokenBalances = useTokenBalances(account ?? undefined, [pair?.liquidityToken])
  // const userLiquidity: undefined | CurrencyAmount<Token> = relevantTokenBalances?.[pair?.liquidityToken?.address ?? '']

  const totalSupply = useTotalSupply(pair?.liquidityToken)

  const liquidityValueA =
    pair &&
    totalSupply &&
    userLiquidity &&
    tokenA &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalSupply.quotient, userLiquidity.quotient)
      ? CurrencyAmount.fromRawAmount(tokenA, pair.getLiquidityValue(tokenA, totalSupply, userLiquidity, false).quotient)
      : undefined

  const liquidityValueB =
    pair &&
    totalSupply &&
    userLiquidity &&
    tokenB &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalSupply.quotient, userLiquidity.quotient)
      ? CurrencyAmount.fromRawAmount(tokenB, pair.getLiquidityValue(tokenB, totalSupply, userLiquidity, false).quotient)
      : undefined

  let percentToRemove: Percent = useMemo(() => {
    return new Percent('0', '100')
  }, [])

  if (active === 'slider') {
    percentToRemove = new Percent(withdrawValue, '100')
  } else {
    const independentAmount = active === 'token0' ? inputAmount0 : inputAmount1
    const liquidityValue = active === 'token0' ? liquidityValueA : liquidityValueB
    if (independentAmount && liquidityValue && !independentAmount.greaterThan(liquidityValue)) {
      percentToRemove = new Percent(independentAmount.quotient, liquidityValue.quotient)
    }
  }

  useEffect(() => {
    const withdrawValue = parseInt(percentToRemove.toFixed())
    setSliderValue(withdrawValue)
    setWithdrawValue(withdrawValue)
  }, [percentToRemove])

  useEffect(() => {
    const currencyA = liquidityValueA
      ? CurrencyAmount.fromRawAmount(
          tokenA,
          percentToRemove.multiply(liquidityValueA.quotient).quotient
        ).toSignificant()
      : '0'

    const currencyB = liquidityValueB
      ? CurrencyAmount.fromRawAmount(
          tokenB,
          percentToRemove.multiply(liquidityValueB.quotient).quotient
        ).toSignificant()
      : '0'

    setToken0Amount(currencyA)
    setToken1Amount(currencyB)

    setInvestmentValue(calculateTotalInvestment(currency0, currency1, +currencyA, +currencyB, rates?.['USD']))
  }, [
    liquidityValueA,
    liquidityValueB,
    calculateTotalInvestment,
    currency0,
    currency1,
    percentToRemove,
    rates,
    tokenA,
    tokenB,
  ])

  const deadline = useTransactionDeadline()
  const router = useV2RouterContract()
  const addTransaction = useTransactionAdder()
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_REMOVE_LIQUIDITY_SLIPPAGE_TOLERANCE)

  const parsedAmounts: { [field in Field]: any } = useMemo(() => {
    return {
      // [Field.CURRENCY_A]: inputAmount0,
      // [Field.CURRENCY_B]: inputAmount1,
      [Field.CURRENCY_A]:
        tokenA && percentToRemove && percentToRemove.greaterThan('0') && liquidityValueA
          ? CurrencyAmount.fromRawAmount(tokenA, percentToRemove.multiply(liquidityValueA.quotient).quotient)
          : undefined,
      [Field.CURRENCY_B]:
        tokenB && percentToRemove && percentToRemove.greaterThan('0') && liquidityValueB
          ? CurrencyAmount.fromRawAmount(tokenB, percentToRemove.multiply(liquidityValueB.quotient).quotient)
          : undefined,
      [Field.LIQUIDITY_PERCENT]: percentToRemove,
      [Field.LIQUIDITY]:
        userLiquidity && percentToRemove && percentToRemove.greaterThan('0')
          ? CurrencyAmount.fromRawAmount(
              userLiquidity.currency,
              percentToRemove.multiply(userLiquidity.quotient).quotient
            )
          : undefined,
    }
  }, [tokenA, tokenB, percentToRemove, userLiquidity, liquidityValueA, liquidityValueB])

  const pairContract: Contract | null = usePairContract(pair?.liquidityToken?.address)
  const { gatherPermitSignature, signatureData } = useLiquidityTokenPermit(
    parsedAmounts[Field.LIQUIDITY],
    router?.address
  )
  const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.LIQUIDITY], router?.address)

  async function onAttemptToApprove() {
    if (!pairContract || !pair || !library || !deadline) throw new Error('missing dependencies')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    if (gatherPermitSignature) {
      try {
        await gatherPermitSignature()
      } catch (error) {
        // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
        if (error?.code !== 4001) {
          await approveCallback()
        }
      }
    } else {
      await approveCallback()
    }
  }

  async function removeLiquidity() {
    if (!chainId || !library || !account || !deadline || !router) throw new Error('missing dependencies')
    const { [Field.CURRENCY_A]: currencyAmountA, [Field.CURRENCY_B]: currencyAmountB } = parsedAmounts
    if (!currencyAmountA || !currencyAmountB) {
      throw new Error('missing currency amounts')
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(currencyAmountA, allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(currencyAmountB, allowedSlippage)[0],
    }

    if (!currency0 || !currency1) throw new Error('missing tokens')
    const liquidityAmount = parsedAmounts[Field.LIQUIDITY]
    if (!liquidityAmount) throw new Error('missing liquidity amount')

    const currencyBIsETH = currency1.isNative
    const oneCurrencyIsETH = currency0.isNative || currencyBIsETH

    if (!tokenA || !tokenB) throw new Error('could not wrap')

    let methodNames: string[], args: Array<string | string[] | number | boolean>
    // we have approval, use normal remove liquidity
    if (approval === ApprovalState.APPROVED) {
      // removeLiquidityETH
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETH', 'removeLiquidityETHSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          deadline.toHexString(),
        ]
      }
      // removeLiquidity
      else {
        methodNames = ['removeLiquidity']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          deadline.toHexString(),
        ]
      }
    }
    // we have a signature, use permit versions of remove liquidity
    else if (signatureData !== null) {
      // removeLiquidityETHWithPermit
      if (oneCurrencyIsETH) {
        methodNames = ['removeLiquidityETHWithPermit', 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens']
        args = [
          currencyBIsETH ? tokenA.address : tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_A : Field.CURRENCY_B].toString(),
          amountsMin[currencyBIsETH ? Field.CURRENCY_B : Field.CURRENCY_A].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
      // removeLiquidityETHWithPermit
      else {
        methodNames = ['removeLiquidityWithPermit']
        args = [
          tokenA.address,
          tokenB.address,
          liquidityAmount.quotient.toString(),
          amountsMin[Field.CURRENCY_A].toString(),
          amountsMin[Field.CURRENCY_B].toString(),
          account,
          signatureData.deadline,
          false,
          signatureData.v,
          signatureData.r,
          signatureData.s,
        ]
      }
    } else {
      throw new Error('Attempting to confirm without approval or a signature. Please contact support.')
    }

    const safeGasEstimates: (BigNumber | undefined)[] = await Promise.all(
      methodNames.map((methodName) =>
        router.estimateGas[methodName](...args)
          .then((estimateGas) => calculateGasMargin(estimateGas))
          .catch((error) => {
            console.error(`estimateGas failed`, methodName, args, error)
            return undefined
          })
      )
    )

    const indexOfSuccessfulEstimation = safeGasEstimates.findIndex((safeGasEstimate) =>
      BigNumber.isBigNumber(safeGasEstimate)
    )

    // all estimations failed...
    if (indexOfSuccessfulEstimation === -1) {
      console.error('This transaction would fail. Please contact support.')
    } else {
      const methodName = methodNames[indexOfSuccessfulEstimation]
      const safeGasEstimate = safeGasEstimates[indexOfSuccessfulEstimation]

      await router[methodName](...args, {
        gasLimit: safeGasEstimate,
      })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: t`Remove ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
              currency0?.symbol
            } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currency1?.symbol}`,
          })
        })
        .catch((error: Error) => {
          console.error(error)
        })
    }
  }

  const theme = useTheme()

  return (
    <>
      <UpperSection>
        <RowBetween>
          <TYPE.subHeader color="text6">
            <Trans>Amount to Withdraw</Trans>
          </TYPE.subHeader>
          <TYPE.subHeader color="text6">
            {balance0 && balance1 ? (
              <>
                <Trans>Added</Trans>
                {` `}
                <BaseCurrencyView
                  type="id"
                  numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT}
                  value={Number(balance0.toExact() + balance1.toExact())}
                />
              </>
            ) : (
              ''
            )}
          </TYPE.subHeader>
        </RowBetween>
        <RowBetween marginTop="1rem">{withdrawValue} %</RowBetween>
        <RowBetween>
          <Slider size={20} value={innerSliderValue} onChange={setDebouncedSliderValue} />
        </RowBetween>
        <AutoColumn style={{ paddingTop: '1rem' }}>
          <TokenPairInputPanel
            onChange={handlePairValueChange}
            currency0={currency0}
            currency1={currency1}
            value0={token0Amount}
            value1={token1Amount}
          />
        </AutoColumn>
        <RowBetween marginTop="0.5rem">
          <TYPE.error fontSize="0.875rem" fontWeight="normal" error={true} textAlign="left"></TYPE.error>
          <TYPE.subHeader color="text6" textAlign="right" width="50%">
            {`≈ `}
            <BaseCurrencyView
              type="id"
              numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT}
              value={investmentValue ? Number(investmentValue) : 0}
            />
          </TYPE.subHeader>
        </RowBetween>
        <RowBetween
          marginTop="1.5rem"
          style={{ borderTopStyle: 'solid', borderTopWidth: '1px', borderTopColor: theme.bg3 }}
        ></RowBetween>
        {account ? (
          <ButtonPrimary
            disabled={!investmentValue}
            marginTop="2rem"
            onClick={
              approval === ApprovalState.APPROVED || signatureData !== null ? removeLiquidity : onAttemptToApprove
            }
          >
            {approval === ApprovalState.APPROVED || signatureData !== null ? (
              <Trans>WITHDRAW</Trans>
            ) : (
              <Trans>APPROVE</Trans>
            )}
          </ButtonPrimary>
        ) : (
          <ButtonPrimary marginTop="2rem" onClick={toggleWalletModal}>
            <Trans>Connect Wallet</Trans>
          </ButtonPrimary>
        )}
      </UpperSection>
    </>
  )
}
