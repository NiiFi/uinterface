import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, usePoolInvestModalToggle } from '../../state/application/hooks'
import { Trans } from '@lingui/macro'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'
import TokenPairInputPanel from 'components/pools/TokenPairInputPanel'
import Modal from '../Modal'
import { TYPE } from 'theme'
import { MainCurrency } from 'utils'
import Slippage from 'components/swap/Slippage'
import { ButtonPrimary } from 'components/Button'

const HeaderRow = styled.div`
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
`

const UpperSection = styled.div`
  position: relative;
  padding: 2rem;
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

export default function PoolInvestModal() {
  const walletModalOpen = useModalOpen(ApplicationModal.POOL_INVEST)
  const togglePoolInvestModal = usePoolInvestModalToggle()
  return (
    <Modal isOpen={walletModalOpen} onDismiss={togglePoolInvestModal} minHeight={false} maxHeight={90}>
      <Wrapper>
        <UpperSection>
          <CloseIcon onClick={togglePoolInvestModal}>
            <CloseColor />
          </CloseIcon>
          <HeaderRow>
            <Trans>Invest</Trans>
          </HeaderRow>
          <RowBetween marginTop={'1rem'}>
            <TYPE.subHeader color="text6">
              <Trans>Amount to Invest</Trans>
            </TYPE.subHeader>
            <TYPE.subHeader color="text6">
              <Trans>Balance 3,965</Trans>
              {` ${MainCurrency}`}
            </TYPE.subHeader>
          </RowBetween>
          <AutoColumn style={{ paddingTop: '1rem' }}>
            <TokenPairInputPanel
              token0={{ symbol: 'ETH', address: '12345' }}
              token1={{ symbol: 'NII', address: '12345' }}
            />
          </AutoColumn>
          <TYPE.subHeader color="text6" textAlign="right">
            <Trans>≈ 9,394.85</Trans>
            {` ${MainCurrency}`}
          </TYPE.subHeader>
          <RowBetween marginTop="1rem">
            <Slippage placement={'left'} />
          </RowBetween>
          <ButtonPrimary marginTop="1rem">
            <Trans>INVEST</Trans>
          </ButtonPrimary>
        </UpperSection>
      </Wrapper>
    </Modal>
  )
}
