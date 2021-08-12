import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'

import { useCurrency } from 'hooks/Tokens'
import { useActiveWeb3React } from 'hooks/web3'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { ApplicationModal } from 'state/application/actions'
import useFakeBuyTokenFlow from 'hooks/useFakeBuyTokenFlow'
import { ReactComponent as Close } from 'assets/images/x.svg'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import { TYPE } from 'theme'
import { useDepositToNahmiiModalToggle, useModalOpen, useWalletModalToggle } from 'state/application/hooks'
import { useEthereumToBaseCurrencyRatesAndApiState, useBaseCurrency } from 'state/user/hooks'
import { ButtonSuccess, ButtonPrimary } from 'components/Button'
import { shortenDecimalValues } from 'utils'
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

export default function DepositTokenModal() {
  const { account } = useActiveWeb3React()
  const { baseCurrencyDetail, baseCurrency } = useBaseCurrency()
  const { ethereumToBaseCurrencyRates: rates } = useEthereumToBaseCurrencyRatesAndApiState()
  const buyTokenModalOpen = useModalOpen(ApplicationModal.DEPOSIT_TO_NAHMII)
  const toggleDepositToNahmiiModal = useDepositToNahmiiModalToggle()
  const toggleWalletModal = useWalletModalToggle()
  const { handleDeposit } = useFakeBuyTokenFlow()
  const currencyTokenOne = useCurrency('ETH')
  const [currencyTokenOneValue, setCurrencyTokenOneValue] = useState<string>('')
  const [ethValue, setEthValue] = useState('0')

  useEffect(() => {
    if (!buyTokenModalOpen) {
      setCurrencyTokenOneValue('')
      setEthValue('0')
    }
  }, [buyTokenModalOpen])

  return (
    <Modal isOpen={buyTokenModalOpen} onDismiss={toggleDepositToNahmiiModal} minHeight={false} maxHeight={90}>
      <Wrapper>
        <UpperSection>
          <CloseIcon onClick={toggleDepositToNahmiiModal}>
            <CloseColor />
          </CloseIcon>
          <HeaderRow>
            <Trans>Deposit Token To Nahmii</Trans>
          </HeaderRow>
          <RowBetween style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>
            <TYPE.body color={`text2`} fontWeight={400} fontSize={14}>
              <Trans>Token To Deposit</Trans>
            </TYPE.body>
            <TYPE.body color={`text2`} fontWeight={400} fontSize={14}>
              <Trans>Amount</Trans>
            </TYPE.body>
          </RowBetween>
          <div>
            <CurrencyInputPanel
              id="deposit-token"
              labelText={''}
              currency={currencyTokenOne}
              otherCurrency={null}
              showMaxButton={false}
              hideBalance={true}
              value={currencyTokenOneValue}
              onUserInput={(value) => {
                setCurrencyTokenOneValue(value)
                const valueInNumber = Number(value)
                if (!isNaN(valueInNumber) && rates?.[baseCurrency]) {
                  setEthValue(
                    shortenDecimalValues(`${valueInNumber * rates[baseCurrency]}`, TOKEN_VALUE_CURRENCY_FORMAT)
                  )
                }
              }}
            />
          </div>
          <TYPE.body color={`text2`} fontWeight={400} fontSize={14} textAlign={'right'}>
            {`≈ ${baseCurrencyDetail.symbol} ${ethValue} `}
          </TYPE.body>
          <Row marginTop="1rem">
            {account ? (
              <ButtonSuccess
                disabled={!currencyTokenOneValue || Number(currencyTokenOneValue) <= 0}
                style={{ textTransform: 'uppercase' }}
                onClick={() => {
                  handleDeposit()
                  toggleDepositToNahmiiModal()
                }}
              >
                <Trans>Deposit Token To Nahmii</Trans>
              </ButtonSuccess>
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
