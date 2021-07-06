import React, { useRef } from 'react'

import { ChevronDown } from 'react-feather'
import styled from 'styled-components'

import { useUserWallets } from 'state/user/hooks'
import { WalletItem, WalletList } from './WalletList'
import Web3Status from '../Web3Status'
import WalletModal from '../WalletModal'
import { useActiveWeb3React } from '../../hooks/web3'
import { useWalletModalToggle } from '../../state/application/hooks'
import Menu from '../Menu'
const MenuWrapper = styled.div`
  padding: 0.5rem 1rem;
`

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0px 0px;
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
  cursor: pointer;
`

export default function WalletPopover() {
  const anchorRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState<boolean>(false)
  const [clickedWalletAddress, setClickedWalletAddress] = React.useState<string>('')
  const { userWallets } = useUserWallets()
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const activeWallet = account ? userWallets[account.toLowerCase()] : null

  const onMenuItemClicked = ({ address }: { address: string }) => {
    setClickedWalletAddress(address.toLowerCase())
    // handleClose()
    toggleWalletModal()
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleClick = () => {
    setOpen(!open)
  }

  if (!activeWallet) {
    return <Web3Status />
  }

  return (
    <>
      <ControlWrapper>
        <ControlBody>
          <ControlButton ref={anchorRef} onClick={handleClick}>
            <WalletItem name={activeWallet.name} address={account as string} />
            <ChevronDown />
          </ControlButton>
          <Menu id="WalletMenu" anchorEl={anchorRef.current} open={open} onClose={handleClose}>
            <MenuWrapper>
              <WalletList onItemClicked={onMenuItemClicked} />
            </MenuWrapper>
          </Menu>
        </ControlBody>
      </ControlWrapper>
      <WalletModal
        ENSName={clickedWalletAddress ? userWallets[clickedWalletAddress].name : ''}
        pendingTransactions={[]}
        confirmedTransactions={[]}
      />
    </>
  )
}
