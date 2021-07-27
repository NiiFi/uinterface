import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Currency } from '@uniswap/sdk-core'
import { t, Trans } from '@lingui/macro'

import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { ApplicationModal } from 'state/application/actions'
import { ReactComponent as Close } from 'assets/images/x.svg'
import { useCurrency } from 'hooks/Tokens'
import { useCreatePoolModalToggle, useModalOpen } from 'state/application/hooks'
import Slippage from 'components/swap/Slippage'
import Row from 'components/Row'
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
  const poolInvestModalOpen = useModalOpen(ApplicationModal.CREATE_POOL)
  const toggleCreatePoolModal = useCreatePoolModalToggle()
  const [currencyTokenOne, setCurrencyTokenOne] = useState<Currency | null | undefined>(useCurrency('ETH'))
  const [currencyTokenTwo, setCurrencyTokenTwo] = useState<Currency | null | undefined>(null)
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
          <div style={{ marginTop: '0.5rem' }}>
            <CurrencyInputPanel
              id="pool-input"
              labelText={t`Add Liquidity`}
              currency={currencyTokenOne}
              otherCurrency={currencyTokenTwo}
              showMaxButton={false}
              value=""
              onCurrencySelect={(newToken) => setCurrencyTokenOne(newToken)}
              onUserInput={() => console.log('Currency 1')}
            />
            <CurrencyInputPanel
              id="pool-output"
              showMaxButton={false}
              currency={currencyTokenTwo}
              otherCurrency={currencyTokenOne}
              value=""
              hideBalance={true}
              onCurrencySelect={(newToken) => setCurrencyTokenTwo(newToken)}
              onUserInput={() => console.log('Currency 2')}
            />
          </div>
          <Row marginTop="1rem">
            <Slippage placement="left" />
          </Row>
          <Row marginTop="1rem">
            <ButtonPrimary style={{ textTransform: 'uppercase' }}>
              <Trans>Create Pool</Trans>
            </ButtonPrimary>
          </Row>
        </UpperSection>
      </Wrapper>
    </Modal>
  )
}
