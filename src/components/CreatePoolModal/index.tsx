import React, { useState, useCallback } from 'react'
import styled from 'styled-components/macro'
import { Currency } from '@uniswap/sdk-core'
import { t, Trans } from '@lingui/macro'

import { useActiveWeb3React } from 'hooks/web3'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import { TYPE, BaseCurrencyView } from 'theme'
import { shortenDecimalValues } from 'utils'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { ApplicationModal } from 'state/application/actions'
import { ReactComponent as Close } from 'assets/images/x.svg'
import { useCurrency } from 'hooks/Tokens'
import { useCreatePoolModalToggle, useModalOpen, useWalletModalToggle } from 'state/application/hooks'
import Slippage from 'components/swap/Slippage'
import Row from 'components/Row'
import { useFakePoolValuesCalculator } from 'state/pool/hooks'
import { ButtonPrimary } from 'components/Button'
import Modal from '../Modal'

const HeaderRow = styled.div`
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
`

const UpperSection = styled.div`
  position: relative;
  padding: 2rem;
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

export default function CreatePoolModal() {
  /**
   * IMPORTANT:
   * We need to remove the usage of all fake values once we have the
   * Integration of API and Actual Business logic in place.
   */
  const { account } = useActiveWeb3React()
  const poolInvestModalOpen = useModalOpen(ApplicationModal.CREATE_POOL)
  const toggleCreatePoolModal = useCreatePoolModalToggle()
  const { calculateTotalInvestmentInUSD } = useFakePoolValuesCalculator()
  const toggleWalletModal = useWalletModalToggle()
  const [fakeInvestmentValue, setFakeInvestmentValue] = useState('')
  const [currencyTokenOne, setCurrencyTokenOne] = useState<Currency | null | undefined>(useCurrency('ETH'))
  const [currencyTokenTwo, setCurrencyTokenTwo] = useState<Currency | null | undefined>(null)
  const [currencyTokenOneValue, setCurrencyTokenOneValue] = useState<string>('')
  const [currencyTokenTwoValue, setCurrencyTokenTwoValue] = useState<string>('')

  const handleTokenValueChange = useCallback(
    ({ value1 = '0', value2 = '0' }: { value1?: string; value2?: string }) => {
      setFakeInvestmentValue(
        calculateTotalInvestmentInUSD({
          token0: {
            value: value1,
            address: '1234',
            symbol: 'ETH',
          },
          token1: {
            value: value2,
            address: '1234',
            symbol: 'NII',
          },
        })
      )
    },
    [setFakeInvestmentValue, calculateTotalInvestmentInUSD]
  )
  return (
    <Modal isOpen={poolInvestModalOpen} onDismiss={toggleCreatePoolModal} minHeight={false} maxHeight={90}>
      <Wrapper>
        <UpperSection>
          <CloseIcon onClick={toggleCreatePoolModal}>
            <CloseColor />
          </CloseIcon>
          <HeaderRow>
            <Trans>Create New Pool</Trans>
          </HeaderRow>
          <div style={{ marginTop: '0.5rem', marginBottom: '-0.5rem' }}>
            <CurrencyInputPanel
              id="pool-input"
              labelText={t`Add Liquidity`}
              currency={currencyTokenOne}
              otherCurrency={currencyTokenTwo}
              showMaxButton={false}
              value={currencyTokenOneValue}
              onCurrencySelect={(newToken) => setCurrencyTokenOne(newToken)}
              onUserInput={(value) => {
                setCurrencyTokenOneValue(value)
                if (currencyTokenOne) {
                  handleTokenValueChange({ value1: value, value2: currencyTokenTwoValue })
                }
              }}
            />
            <CurrencyInputPanel
              id="pool-output"
              showMaxButton={false}
              currency={currencyTokenTwo}
              otherCurrency={currencyTokenOne}
              value={currencyTokenTwoValue}
              hideBalance={true}
              onCurrencySelect={(newToken) => setCurrencyTokenTwo(newToken)}
              onUserInput={(value) => {
                setCurrencyTokenTwoValue(value)
                if (currencyTokenTwo) {
                  handleTokenValueChange({ value2: value, value1: currencyTokenOneValue })
                }
              }}
            />
          </div>
          <TYPE.body color={`text2`} fontWeight={400} fontSize={14} textAlign={'right'}>
            {`≈ `}
            <BaseCurrencyView
              type="id"
              value={shortenDecimalValues(fakeInvestmentValue, TOKEN_VALUE_CURRENCY_FORMAT)}
            />
          </TYPE.body>
          <Row marginTop="1rem">
            <Slippage placement="left" />
          </Row>
          <Row marginTop="1rem">
            {account ? (
              <ButtonPrimary style={{ textTransform: 'uppercase' }} onClick={toggleCreatePoolModal}>
                <Trans>Create Pool</Trans>
              </ButtonPrimary>
            ) : (
              <ButtonPrimary onClick={toggleWalletModal}>
                <Trans>Connect Wallet</Trans>
              </ButtonPrimary>
            )}
          </Row>
        </UpperSection>
      </Wrapper>
    </Modal>
  )
}
