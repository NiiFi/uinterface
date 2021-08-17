import React, { useCallback, useState, useMemo } from 'react'
import styled from 'styled-components/macro'
import { useWalletModalToggle } from 'state/application/hooks'
import { t, Trans } from '@lingui/macro'

import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'
import { Field } from 'state/mint/actions'
import { useActiveWeb3React } from 'hooks/web3'
import TokenPairInputPanel from 'components/pools/TokenPairInputPanel'
import { TYPE, BaseCurrencyView } from 'theme'
import Slippage from 'components/swap/Slippage'
import { useInvestmentCalculator } from 'state/pool/hooks'
import { tryParseAmount } from 'state/swap/hooks'
import { ButtonPrimary } from 'components/Button'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import { useUserSlippageToleranceWithDefault, useEthereumToBaseCurrencyRatesAndApiState } from 'state/user/hooks'
import { addLiquidityAsync, DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE } from 'hooks/useAddLiquidity'
import { useTransactionAdder } from 'state/transactions/hooks'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { PairState, usePair } from 'hooks/usePairs'
import { useTotalSupply } from 'hooks/useTotalSupply'
import { useV2RouterContract } from 'hooks/useContract'
import { useCurrencyBalances } from 'state/wallet/hooks'
import JSBI from 'jsbi'

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
`

const ZERO = JSBI.BigInt(0)

// TODO: extract calculations to shared folder (hooks?)
export default function PoolInvest({ currency0, currency1 }: { currency0: Currency; currency1: Currency }) {
  const { account, chainId, library } = useActiveWeb3React()
  const { ethereumToBaseCurrencyRates: rates } = useEthereumToBaseCurrencyRatesAndApiState()
  const [active, setActive] = useState('')
  const [token0Amount, setToken0Amount] = useState('')
  const [token1Amount, setToken1Amount] = useState('')
  const [investmentValue, setInvestmentValue] = useState(0)
  const { calculateTotalInvestment } = useInvestmentCalculator()
  const toggleWalletModal = useWalletModalToggle()
  const handlePairValueChange = useCallback(
    ({ token0, token1 }, active) => {
      setActive(active)
      setToken0Amount(token0.value)
      setToken1Amount(token1.value)
      setInvestmentValue(calculateTotalInvestment(currency0, currency1, +token0.value, +token1.value, rates?.['USD']))
    },
    [setToken0Amount, setToken1Amount, calculateTotalInvestment, setInvestmentValue, currency0, currency1, rates]
  )

  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE)
  const addTransaction = useTransactionAdder()
  const deadline = useTransactionDeadline()

  const currencies: { [field in Field]?: Currency } = useMemo(
    () => ({
      [Field.CURRENCY_A]: currency0 ?? undefined,
      [Field.CURRENCY_B]: currency1 ?? undefined,
    }),
    [currency0, currency1]
  )

  const independentAmount: CurrencyAmount<Currency> | undefined = useMemo(
    () => tryParseAmount(token0Amount, currencies[Field.CURRENCY_A]),
    [currencies, token0Amount]
  )

  const dependentAmount: CurrencyAmount<Currency> | undefined = useMemo(
    () => tryParseAmount(token1Amount, currencies[Field.CURRENCY_B]),
    [currencies, token1Amount]
  )

  const [pairState, pair] = usePair(currency0, currency1)
  const totalSupply = useTotalSupply(pair?.liquidityToken)
  const noLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(totalSupply && JSBI.equal(totalSupply.quotient, ZERO)) ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        JSBI.equal(pair.reserve0.quotient, ZERO) &&
        JSBI.equal(pair.reserve1.quotient, ZERO)
    )
  const router = useV2RouterContract()
  const parsedAmounts: { [field in Field]: CurrencyAmount<Currency> | undefined } = useMemo(() => {
    return {
      [Field.CURRENCY_A]: active === 'token0' ? independentAmount : dependentAmount,
      [Field.CURRENCY_B]: active === 'token0' ? dependentAmount : independentAmount,
    }
  }, [dependentAmount, independentAmount, active])

  const balances = useCurrencyBalances(account ?? undefined, [
    currencies[Field.CURRENCY_A],
    currencies[Field.CURRENCY_B],
  ])
  const currencyBalances: { [field in Field]?: CurrencyAmount<Currency> } = {
    [Field.CURRENCY_A]: balances[0],
    [Field.CURRENCY_B]: balances[1],
  }

  let error: string | undefined
  if (!account) {
    error = t`Connect Wallet`
  }

  if (pairState === PairState.INVALID) {
    error = error ?? t`Invalid pair`
  }

  if (!parsedAmounts[Field.CURRENCY_A] || !parsedAmounts[Field.CURRENCY_B]) {
    error = error ?? t`Enter an amount`
  }

  const { [Field.CURRENCY_A]: currencyAAmount, [Field.CURRENCY_B]: currencyBAmount } = parsedAmounts

  if (currencyAAmount && currencyBalances?.[Field.CURRENCY_A]?.lessThan(currencyAAmount)) {
    error = t`Insufficient ${currencies[Field.CURRENCY_A]?.symbol} balance`
  }

  if (currencyBAmount && currencyBalances?.[Field.CURRENCY_B]?.lessThan(currencyBAmount)) {
    error = t`Insufficient ${currencies[Field.CURRENCY_B]?.symbol} balance`
  }

  const addLiquidity = () => {
    addLiquidityAsync(
      account,
      addTransaction,
      allowedSlippage,
      currencies,
      currency0,
      currency1,
      deadline,
      error,
      noLiquidity,
      router,
      chainId,
      library,
      parsedAmounts
    )
  }

  return (
    <>
      <UpperSection>
        <RowBetween>
          <TYPE.subHeader color="text6">
            <Trans>Amount to add</Trans>
          </TYPE.subHeader>
          <TYPE.subHeader color="text6">
            {currencyBalances[Field.CURRENCY_A] ? (
              <>
                <Trans>Balance</Trans>
                {` ${formatCurrencyAmount(currencyBalances[Field.CURRENCY_A], 4)}`}
              </>
            ) : (
              ''
            )}
          </TYPE.subHeader>
        </RowBetween>
        <AutoColumn style={{ paddingTop: '2rem' }}>
          <TokenPairInputPanel onChange={handlePairValueChange} currency0={currency0} currency1={currency1} />
        </AutoColumn>
        <RowBetween marginTop="0.5rem">
          <TYPE.error fontSize="0.875rem" fontWeight="normal" error={true} textAlign="left">
            {error &&
              currencies[Field.CURRENCY_A] &&
              currencies[Field.CURRENCY_B] &&
              parsedAmounts[Field.CURRENCY_A] &&
              parsedAmounts[Field.CURRENCY_B] &&
              error}
          </TYPE.error>
          <TYPE.subHeader color="text6" textAlign="right" width="50%">
            {`≈ `}
            <BaseCurrencyView type="id" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} value={investmentValue} />
          </TYPE.subHeader>
        </RowBetween>
        <RowBetween marginTop="1.5rem">
          <Slippage placement={'left'} />
        </RowBetween>
        {account ? (
          <ButtonPrimary
            style={{ textTransform: 'uppercase' }}
            disabled={!!error}
            marginTop="2rem"
            onClick={addLiquidity}
          >
            <Trans>Add Liquidity</Trans>
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
