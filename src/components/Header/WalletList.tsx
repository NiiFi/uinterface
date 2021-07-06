import React from 'react'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'

import { useUserWallets } from 'state/user/hooks'
import { useActiveWeb3React } from '../../hooks/web3'
import { PencilIcon } from '../Icons'
import Identicon from '../Identicon'

const WalletWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  &:nth-child(1) {
    margin-top: 0;
    margin-bottom: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`
const WalletTitleWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-left: 5px;

  > p {
    margin: 0;
    font-size: 1rem;
    color: ${({ active, theme }) => (active ? theme.primary1 : theme.text1)};
  }
  > span {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.text2};
  }
`
const WalletListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const WalletIconTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`
const WalletIconWrapper = styled.div`
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: ${({ theme }) => theme.bg5};
  }
`

export const WalletTitle = ({ name, address }: { name: string; address: string }) => {
  const { account } = useActiveWeb3React()
  const isActive = account?.toLowerCase() === address
  return (
    <WalletTitleWrapper active={isActive}>
      <p>{name}</p>
      <span>
        <Trans>Wallet</Trans>
      </span>
    </WalletTitleWrapper>
  )
}

export const WalletItem = ({
  name,
  address,
  onClick,
  editable = false,
}: {
  editable?: boolean
  name: string
  address: string
  onClick?: ({ address }: { address: string }) => void
}) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (onClick) {
      e.stopPropagation()
      onClick({ address })
    }
  }
  return (
    <WalletWrapper>
      <WalletIconTitleWrapper>
        <Identicon address={address} />
        <WalletTitle name={name} address={address}></WalletTitle>
      </WalletIconTitleWrapper>
      {editable && (
        <WalletIconWrapper onClick={handleClick}>
          <PencilIcon />
        </WalletIconWrapper>
      )}
    </WalletWrapper>
  )
}

export const WalletList = ({ onItemClicked }: { onItemClicked: ({ address }: { address: string }) => void }) => {
  const { userWallets } = useUserWallets()
  const { account } = useActiveWeb3React()
  const accountKey = account?.toLowerCase()

  const addresses = Object.keys(userWallets).filter((address) => accountKey !== address)
  const activeWallet = accountKey ? userWallets[accountKey] : null
  const onWalletItemClicked = ({ address }: { address: string }) => {
    onItemClicked({ address })
  }
  return (
    <WalletListWrapper>
      {activeWallet && (
        <WalletItem
          editable
          address={accountKey as string}
          onClick={onWalletItemClicked}
          name={activeWallet.name}
        ></WalletItem>
      )}
      {addresses.map((address, index) => (
        <WalletItem
          editable
          onClick={onWalletItemClicked}
          key={index}
          address={address}
          name={userWallets[address].name}
        ></WalletItem>
      ))}
    </WalletListWrapper>
  )
}
