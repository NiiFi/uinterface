import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'
import { Currency } from '@niifi/godzilla2-sdk'
import { ChevronDown } from 'react-feather'

import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { ApplicationModal } from 'state/application/actions'
import useFakeBuyTokenFlow from 'hooks/useFakeBuyTokenFlow'
import { ReactComponent as Close } from 'assets/images/x.svg'
import { TYPE } from 'theme'
import { useBuyTokenModalToggle, useModalOpen, useWalletModalToggle } from 'state/application/hooks'
import { useEthereumToBaseCurrencyRatesAndApiState, useBaseCurrency } from 'state/user/hooks'
import { ButtonPrimary } from 'components/Button'
import { shortenDecimalValues } from 'utils'
import useTheme from 'hooks/useTheme'
import Row, { RowBetween } from 'components/Row'
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

export default function BuyTokenModal() {
  const theme = useTheme()
  const { account } = useActiveWeb3React()
  const { baseCurrencyDetail, baseCurrency } = useBaseCurrency()
  const { ethereumToBaseCurrencyRates: rates } = useEthereumToBaseCurrencyRatesAndApiState()
  const buyTokenModalOpen = useModalOpen(ApplicationModal.BUY_TOKEN)
  const toggleBuyTokenModal = useBuyTokenModalToggle()
  const toggleWalletModal = useWalletModalToggle()
  const { handleBuy } = useFakeBuyTokenFlow()
  const [currencyTokenOne, setCurrencyTokenOne] = useState<Currency | null | undefined>(useCurrency('ETH'))
  const [currencyTokenOneValue, setCurrencyTokenOneValue] = useState<string>('')
  const [ethValue, setEthValue] = useState('0')
  const onCurrencySelect = useCallback(
    (token: any) => {
      setCurrencyTokenOne(token)
    },
    [setCurrencyTokenOne]
  )

  useEffect(() => {
    if (!buyTokenModalOpen) {
      setCurrencyTokenOneValue('')
      setEthValue('0')
    }
  }, [buyTokenModalOpen])
  return (
    <Modal isOpen={buyTokenModalOpen} onDismiss={toggleBuyTokenModal} minHeight={false} maxHeight={90}>
      <Wrapper>
        <UpperSection>
          <CloseIcon onClick={toggleBuyTokenModal}>
            <CloseColor />
          </CloseIcon>
          <HeaderRow>
            <Trans>Buy Tokens</Trans>
          </HeaderRow>
          <RowBetween style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>
            <TYPE.body color={`text2`} fontWeight={400} fontSize={14}>
              <Trans>Token To Buy</Trans>
            </TYPE.body>
            <TYPE.body color={`text2`} fontWeight={400} fontSize={14}>
              <Trans>Amount</Trans>
            </TYPE.body>
          </RowBetween>
          <div>
            <CurrencyInputPanel
              id="buy-tokenPool"
              labelText={''}
              currency={currencyTokenOne}
              otherCurrency={null}
              showMaxButton={false}
              postfix={baseCurrencyDetail.symbol}
              hideBalance={true}
              value={currencyTokenOneValue}
              onCurrencySelect={onCurrencySelect}
              onUserInput={(value) => {
                setCurrencyTokenOneValue(value)
                const valueInNumber = Number(value)
                if (!isNaN(valueInNumber) && rates?.[baseCurrency]) {
                  setEthValue(shortenDecimalValues(`${valueInNumber / rates[baseCurrency]}`, '0.[000]'))
                }
              }}
            />
          </div>
          <TYPE.body color={theme.text2} fontWeight={400} fontSize={14} textAlign={'right'}>
            {`??? ${ethValue} ${currencyTokenOne?.symbol || 'ETH'}`}
          </TYPE.body>
          <Row
            marginTop="1rem"
            style={{ borderTop: `1px solid ${theme.bg3}`, borderBottom: `1px solid ${theme.bg3}`, padding: '1rem 0px' }}
          >
            <RowBetween>
              <TYPE.body color={theme.text1} fontWeight={'normal'} fontSize={'1rem'}>
                <Trans>Payment Method</Trans>
              </TYPE.body>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TYPE.body color={theme.text1} fontWeight={'normal'} fontSize={'1rem'}>
                  <Trans>VISA *5546</Trans>
                </TYPE.body>
                <ChevronDown />
              </div>
            </RowBetween>
          </Row>
          <Row marginTop="1rem">
            {account ? (
              <ButtonPrimary
                disabled={!currencyTokenOneValue || Number(currencyTokenOneValue) <= 0}
                style={{ textTransform: 'uppercase' }}
                onClick={() => {
                  handleBuy()
                  toggleBuyTokenModal()
                }}
              >
                <Trans>Buy</Trans>
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
