import React from 'react'
import styled from 'styled-components/macro'
import { Trans, t } from '@lingui/macro'

import { useUserWallets } from 'state/user/hooks'
import { UserWalletTypes } from 'state/user/actions'
import { useActiveWeb3React } from '../../hooks/web3'
import { PencilIcon } from '../Icons'
import Identicon from '../Identicon'

const WalletWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`
const WalletTitleWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  cursor: auto;

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
  margin-top: 1rem;
`
const WalletIconTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`
const WalletIconWrapper = styled.div<{ isRemoving?: boolean }>`
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: ${({ isRemoving, theme }) => (!isRemoving ? theme.bg5 : '')};
  }
`
const ConnectedSign = styled.div`
  position: absolute;
  border-radius: 50%;
  height: 10px;
  width: 10px;
  border: 1px solid white;
  bottom: 0px;
  right: -2px;
  background-color: ${({ theme }) => theme.primary1};
`
const IdenticonWrapper = styled.div`
  position: relative;
`
export const WalletTitle = ({ name, address }: { name: string; address: string }) => {
  const { account } = useActiveWeb3React()
  const isActive = !!account && account.toLowerCase() === address.toLowerCase()
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
  Icon = <PencilIcon />,
  editable = false,
  isRemoving = false,
  style = {},
}: {
  style?: React.CSSProperties
  editable?: boolean
  isRemoving?: boolean
  name: string
  address: string
  Icon?: JSX.Element
  onClick?: ({ address }: { address: string }) => void
}) => {
  const { account } = useActiveWeb3React()
  const isActive = account && account.toLowerCase() === address.toLowerCase()
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (onClick) {
      e.stopPropagation()
      onClick({ address })
    }
  }
  return (
    <WalletWrapper style={style}>
      <WalletIconTitleWrapper>
        <IdenticonWrapper>
          <Identicon address={address} />
          {isActive && <ConnectedSign />}
        </IdenticonWrapper>
        <WalletTitle name={name} address={address}></WalletTitle>
      </WalletIconTitleWrapper>
      {editable && (
        <WalletIconWrapper title={t`Remove Wallet`} isRemoving={isRemoving} onClick={handleClick}>
          {Icon}
        </WalletIconWrapper>
      )}
    </WalletWrapper>
  )
}

export const WalletList = ({
  isRemoving = false,
  onItemClicked,
  Icon,
  type = UserWalletTypes.CONNECTED,
}: {
  isRemoving?: boolean
  onItemClicked: ({ address }: { address: string }) => void
  type?: UserWalletTypes
  Icon?: JSX.Element
}) => {
  const { userWallets } = useUserWallets()
  const { account } = useActiveWeb3React()
  const accountKey = !!account && account.toLowerCase()

  const addresses = Object.keys(userWallets).filter((address) => accountKey !== address)
  const activeWallet = accountKey ? userWallets[accountKey] : null
  const onWalletItemClicked = ({ address }: { address: string }) => {
    onItemClicked({ address })
  }
  return (
    <WalletListWrapper>
      {activeWallet && (
        <WalletItem
          key={addresses.length + 1}
          editable
          isRemoving={isRemoving}
          Icon={Icon}
          address={accountKey as string}
          onClick={onWalletItemClicked}
          name={activeWallet.name}
        ></WalletItem>
      )}
      {addresses
        .filter((address) => userWallets[address].type === type)
        .sort((a, b) => userWallets[a].timestamp - userWallets[b].timestamp)
        .reverse()
        .map((address, index) => (
          <WalletItem
            editable
            isRemoving={isRemoving}
            Icon={Icon}
            onClick={onWalletItemClicked}
            key={index}
            address={address}
            name={userWallets[address].name}
          ></WalletItem>
        ))}
    </WalletListWrapper>
  )
}
