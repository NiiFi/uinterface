import React from 'react'
import Menu from '@material-ui/core/Menu'
import { ChevronDown } from 'react-feather'
import styled from 'styled-components'

import { useUserWallets } from 'state/user/hooks'
import { WalletItem, WalletList } from './WalletList'
import Web3Status from '../Web3Status'
import { useActiveWeb3React } from '../../hooks/web3'

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { userWallets } = useUserWallets()
  const { account } = useActiveWeb3React()
  const activeWallet = account ? userWallets[account.toLowerCase()] : null
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  if (!activeWallet) {
    return <Web3Status />
  }

  return (
    <ControlWrapper>
      <ControlBody>
        <ControlButton onClick={handleClick}>
          <WalletItem name={activeWallet.name} address={account as string} />
          <ChevronDown />
        </ControlButton>
        <Menu id="WalletMenu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuWrapper>
            <WalletList />
          </MenuWrapper>
        </Menu>
      </ControlBody>
    </ControlWrapper>
  )
}
