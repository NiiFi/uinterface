import React, { useCallback, useState, useMemo } from 'react'
import { Currency } from '@uniswap/sdk-core'
import styled from 'styled-components/macro'
import { useWalletModalToggle } from 'state/application/hooks'
import { Trans } from '@lingui/macro'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'
import { useCurrency } from 'hooks/Tokens'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import TokenPairInputPanel from 'components/pools/TokenPairInputPanel'
import { TYPE, BaseCurrencyView } from 'theme'
import { PoolInvestPairValues } from 'state/pool/actions'
import { useFakePoolValuesCalculator } from 'state/pool/hooks'
import { tryParseAmount } from 'state/swap/hooks'
import { ButtonPrimary } from 'components/Button'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import Slider from 'components/Slider'
import useTheme from '../../hooks/useTheme'

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

export default function PoolWithdraw({ currency0, currency1 }: { currency0: Currency; currency1: Currency }) {
  const { account } = useActiveWeb3React()
  const [token0Amount, setToken0Amount] = useState('')
  const [investmentValue, setInvestmentValue] = useState('')
  const [withdrawValue, setWithdrawValue] = useState(50)
  const [sliderValue, setSliderValue] = useState(50)
  const { calculateTotalInvestmentInUSD } = useFakePoolValuesCalculator()
  const inputCurrency = useCurrency('ETH')
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  const toggleWalletModal = useWalletModalToggle()
  const handlePairValueChange = useCallback(
    ({ token0, token1 }: PoolInvestPairValues) => {
      setToken0Amount(token0.value)
      setInvestmentValue(calculateTotalInvestmentInUSD({ token0, token1 }))
    },
    [setToken0Amount, calculateTotalInvestmentInUSD, setInvestmentValue]
  )
  const inputAmount = useMemo(
    () => tryParseAmount(token0Amount, inputCurrency ?? undefined),
    [inputCurrency, token0Amount]
  )
  const hasInputAmount = Boolean(inputAmount?.greaterThan('0'))
  const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount)

  const SliderChangeHandler: any = (e: any) => {
    setWithdrawValue(e)
    setSliderValue(e)
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
            {balance ? (
              <>
                <Trans>Added</Trans>
                {` ${formatCurrencyAmount(balance, 4)}`}
              </>
            ) : (
              ''
            )}
          </TYPE.subHeader>
        </RowBetween>
        <RowBetween marginTop="1rem">{withdrawValue} %</RowBetween>
        <RowBetween>
          <Slider size={20} value={sliderValue} onChange={SliderChangeHandler} />
        </RowBetween>
        <AutoColumn style={{ paddingTop: '1rem' }}>
          <TokenPairInputPanel onChange={handlePairValueChange} currency0={currency0} currency1={currency1} />
        </AutoColumn>
        <RowBetween marginTop="0.5rem">
          <TYPE.error fontSize="0.875rem" fontWeight="normal" error={true} textAlign="left">
            {!sufficientBalance && hasInputAmount ? <Trans>Insufficient Balance</Trans> : ''}
          </TYPE.error>
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
          <ButtonPrimary disabled={!sufficientBalance && hasInputAmount} marginTop="2rem">
            <Trans>WITHDRAW</Trans>
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
