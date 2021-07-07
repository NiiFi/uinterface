import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useManageWalletListModalToggle } from '../../state/application/hooks'
import { Trans } from '@lingui/macro'

import { RemoveIcon } from '../Icons'
import { useActiveWeb3React } from '../../hooks/web3'
import useTheme from 'hooks/useTheme'
import { useUserWallets } from 'state/user/hooks'
import Modal from '../Modal'
import { WalletList } from '../Header/WalletList'

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
const ListTitle = styled.div`
  color: ${({ theme }) => theme.text5};
  font-size: 1rem;
  margin-top: 1rem;
`
const ListWrapper = styled.div`
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 400px;
  width: 100%;
`

export default function ManageWalletListModal() {
  const theme = useTheme()
  const walletModalOpen = useModalOpen(ApplicationModal.MANAGE_WALLET_LIST)
  const { account, deactivate } = useActiveWeb3React()
  const toggleWalletModal = useManageWalletListModalToggle()
  const { removeUserWallet } = useUserWallets()
  const handleItemClicked = useCallback(
    ({ address }: { address: string }) => {
      if (account && account.toLowerCase() === address) {
        deactivate()
      }
      removeUserWallet({ address })
    },
    [removeUserWallet, deactivate, account]
  )
  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <Wrapper>
        <UpperSection>
          <CloseIcon onClick={toggleWalletModal}>
            <CloseColor />
          </CloseIcon>
          <HeaderRow>
            <Trans>Manage Wallets</Trans>
          </HeaderRow>
          <ListWrapper>
            <ListTitle>
              <Trans>Connected</Trans>
            </ListTitle>
            <WalletList isRemoving={true} Icon={<RemoveIcon color={theme.error} />} onItemClicked={handleItemClicked} />
          </ListWrapper>
        </UpperSection>
      </Wrapper>
    </Modal>
  )
}
