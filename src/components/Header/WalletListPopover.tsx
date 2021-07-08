import React, { useRef, useEffect } from 'react'
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { isTablet, isMobile } from 'react-device-detect'
import { ChevronDown } from 'react-feather'
import styled from 'styled-components'

import { useUserWallets } from 'state/user/hooks'
import { WalletItem, WalletList } from './WalletList'
import Web3Status from '../Web3Status'
import WalletModal, { WALLET_VIEWS } from '../WalletModal'
import ManageWalletListModal from 'components/ManageWalletListModal'
import { useActiveWeb3React } from '../../hooks/web3'
import { UserWalletTypes } from 'state/user/actions'
import { useWalletModalToggle, useManageWalletListModalToggle } from '../../state/application/hooks'
import Menu from '../Menu'
import { WalletIcon, PlusIcon } from '../Icons'

const MenuWrapper = styled.div`
  padding: 0.5rem;
  margin: 0 1rem;
  max-height: 320px;
  overflow-y: scroll;
  &:focus-visible {
    outline: none;
  }
`

const MenuFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.bg3};
  flex-direction: column;
  display: flex;
  padding: 0.5rem;
  margin: 0.25rem 1rem;
`
const MenuFooterButton = styled.div`
  width: 100%;
  display: flex;
  margin: 0.625rem 0px;
  cursor: pointer;
  color: ${({ theme }) => theme.text1};
  > svg {
    margin-right: 1rem;
  }
`

const ListTitle = styled.div`
  color: ${({ theme }) => theme.text5};
  font-size: 1rem;
  margin-bottom: 0.625rem;
`
const ControlWrapper = styled.div<{ open: boolean }>`
  cursor: pointer;
  width: content-fit;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0px 0px 1rem 0px;
  background-color: ${({ open, theme }) => (open ? theme.bg5 : '')};
  border-radius: 8px;
  :hover {
    background-color: ${({ theme }) => theme.bg5};
    border-radius: 8px;
  }
`

const ControlBody = styled.div`
  display: flex;
`
const ControlButton = styled.div`
  display: flex;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text5};
  box-sizing: border-box;
  cursor: pointer;
  > svg {
    margin-left: 0.5rem;
  }
`

const useAccountChange = () => {
  const { account } = useActiveWeb3React()
  const { addNewUserWallet } = useUserWallets()
  useEffect(() => {
    if (account) {
      const timeOut: number = window.setTimeout(() => {
        addNewUserWallet({ address: account.toLowerCase(), type: UserWalletTypes.CONNECTED })
      })
      return () => {
        window.clearTimeout(timeOut)
      }
    }
    return undefined
  }, [account, addNewUserWallet])
}
export default function WalletPopover() {
  const anchorRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState<boolean>(false)
  const [walletModalView, setWalletModalView] = React.useState<string>()
  const [clickedWalletAddress, setClickedWalletAddress] = React.useState<string | null>(null)
  const { userWallets, userRecentWallet } = useUserWallets()
  const { account } = useActiveWeb3React()
  const { error } = useWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const toggleManageWalletListModal = useManageWalletListModalToggle()
  const activeWallet =
    account && userWallets[account.toLowerCase()]
      ? userWallets[account.toLowerCase()]
      : userRecentWallet && userWallets[userRecentWallet.toLowerCase()]
      ? userWallets[userRecentWallet.toLowerCase()]
      : null

  useAccountChange()
  const onMenuItemClicked = ({ address }: { address: string }) => {
    setWalletModalView(WALLET_VIEWS.ACCOUNT)
    setClickedWalletAddress(address.toLowerCase())
    toggleWalletModal()
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    setOpen(!open)
  }

  const handleConnectWalletClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setClickedWalletAddress(null)
    setWalletModalView(WALLET_VIEWS.OPTIONS)
    toggleWalletModal()
  }
  if (error || !activeWallet) {
    return <Web3Status />
  }

  return (
    <>
      <ControlWrapper ref={anchorRef} open={open} onClick={handleClick}>
        <ControlBody>
          <ControlButton>
            <WalletItem
              style={{ marginBottom: '0px' }}
              name={activeWallet.name}
              address={account || userRecentWallet || ''}
            />
            <ChevronDown />
          </ControlButton>
          <Menu
            style={{ width: isMobile || isTablet ? '14.75rem' : '20rem', borderRadius: '12px' }}
            id="WalletMenu"
            anchorEl={anchorRef.current}
            open={open}
            onClose={handleClose}
          >
            <MenuWrapper>
              <ListTitle>
                <Trans>Connected</Trans>
              </ListTitle>
              <WalletList onItemClicked={onMenuItemClicked} />
            </MenuWrapper>
            <MenuFooter>
              <MenuFooterButton onClick={handleConnectWalletClick}>
                <PlusIcon />
                <Trans>Connect Wallet</Trans>
              </MenuFooterButton>
              <MenuFooterButton
                onClick={() => {
                  toggleManageWalletListModal()
                }}
              >
                <WalletIcon />
                <Trans>Manage Wallet</Trans>
              </MenuFooterButton>
            </MenuFooter>
          </Menu>
        </ControlBody>
      </ControlWrapper>
      <WalletModal
        ENSName={clickedWalletAddress ?? undefined}
        pendingTransactions={[]}
        confirmedTransactions={[]}
        activeView={walletModalView}
      />
      <ManageWalletListModal />
    </>
  )
}
