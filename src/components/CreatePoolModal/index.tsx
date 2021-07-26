import React from 'react'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'

import { ApplicationModal } from 'state/application/actions'
import { ReactComponent as Close } from 'assets/images/x.svg'
import { useCreatePoolModalToggle, useModalOpen } from 'state/application/hooks'
import Modal from '../Modal'

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

export default function CreatePoolModal() {
  const poolInvestModalOpen = useModalOpen(ApplicationModal.CREATE_POOL)
  const toggleCreatePoolModal = useCreatePoolModalToggle()
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
        </UpperSection>
      </Wrapper>
    </Modal>
  )
}
