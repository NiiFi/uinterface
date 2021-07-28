import React, { useCallback, useState, useMemo } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, usePoolInvestModalToggle, useWalletModalToggle } from 'state/application/hooks'
import { Trans } from '@lingui/macro'

import { shortenDecimalValues } from 'utils'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'
import { useCurrency } from 'hooks/Tokens'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import TokenPairInputPanel from 'components/pools/TokenPairInputPanel'
import Modal from '../Modal'
import { TYPE } from 'theme'
import { MainCurrency } from 'utils'
import Slippage from 'components/swap/Slippage'
import { PoolInvestPairValues } from 'state/pool/actions'
import { useFakePoolValuesCalculator } from 'state/pool/hooks'
import { tryParseAmount } from 'state/swap/hooks'
import { ButtonPrimary } from 'components/Button'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'

const HeaderRow = styled.div`
  font-weight: 500;
  padding-top: 0px;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
`

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

const CloseIcon = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    right: 1.5rem;
    top: 1.5rem;
  `}
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

export default function PoolInvest() {
  const { account } = useActiveWeb3React()
  const [token0Amount, setToken0Amount] = useState('')
  const [investmentValue, setInvestmentValue] = useState('')
  const { calculateTotalInvestmentInUSD } = useFakePoolValuesCalculator()
  const inputCurrency = useCurrency('ETH')
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  const toggleWalletModal = useWalletModalToggle()
  const poolInvestModalOpen = useModalOpen(ApplicationModal.POOL_INVEST)
  const togglePoolInvestModal = usePoolInvestModalToggle()
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
  return (
    <>
      <UpperSection>
        {/*<HeaderRow>*/}
        {/*  <Trans>Invest</Trans>*/}
        {/*</HeaderRow>*/}
        <RowBetween>
          <TYPE.subHeader color="text6">
            <Trans>Amount to Invest</Trans>
          </TYPE.subHeader>
          <TYPE.subHeader color="text6">
            {balance ? (
              <>
                <Trans>Balance</Trans>
                {` ${formatCurrencyAmount(balance, 4)}`}
              </>
            ) : (
              ''
            )}
          </TYPE.subHeader>
        </RowBetween>
        <AutoColumn style={{ paddingTop: '2rem' }}>
          <TokenPairInputPanel
            onChange={handlePairValueChange}
            token0={{ symbol: 'ETH', address: '12345' }}
            token1={{ symbol: 'NII', address: '12345' }}
          />
        </AutoColumn>
        <RowBetween marginTop="0.5rem">
          <TYPE.error fontSize="0.875rem" fontWeight="normal" error={true} textAlign="left">
            {!sufficientBalance && hasInputAmount ? <Trans>Insufficient Balance</Trans> : ''}
          </TYPE.error>
          <TYPE.subHeader color="text6" textAlign="right" width="50%">
            {`≈ ${
              investmentValue ? shortenDecimalValues(investmentValue, TOKEN_VALUE_CURRENCY_FORMAT) : '0'
            } ${MainCurrency}`}
          </TYPE.subHeader>
        </RowBetween>
        <RowBetween marginTop="1.5rem">
          <Slippage placement={'left'} />
        </RowBetween>
        {account ? (
          <ButtonPrimary disabled={!sufficientBalance && hasInputAmount} marginTop="2rem">
            <Trans>INVEST</Trans>
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
