import React from 'react'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks/web3'
import { Trans } from '@lingui/macro'

import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import Copy from './Copy'

import { ReactComponent as Close } from '../../assets/images/x.svg'
import { LinkIcon } from '../Icons'
import { ExternalLink } from '../../theme'
import { useUserWallets } from 'state/user/hooks'

const HeaderRow = styled.div`
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  > p {
    margin: 0;
    margin-top: 8px;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.text5};
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
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
`

const InfoCard = styled.div<{ topBorder?: boolean }>`
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  border-top: ${({ topBorder }) => (topBorder ? '1px solid ' : '')} ${({ theme }) => theme.bg3};
  margin-top: 0.625rem;
  padding: 0.5rem 0px;
  h4 {
    font-size: 1rem;
    color: ${({ theme }) => theme.text1};
  }
`

const AccountControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;
`
const AccountControl = styled.div`
  display: flex;
  padding: 0.75rem 0rem;
  svg {
    margin-right: 1rem;
  }
`
const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  flex-shrink: 0;
  display: flex;
  font-size: 1rem;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  :hover,
  :active,
  :focus {
    text-decoration: none;
  }
`

const CloseIcon = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

interface AccountDetailsProps {
  toggleWalletModal: () => void
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
}

export default function AccountDetails({ toggleWalletModal, ENSName }: AccountDetailsProps) {
  const { chainId } = useActiveWeb3React()
  const { userWallets } = useUserWallets()
  const walletDetail = ENSName ? userWallets[ENSName.toLowerCase()] : null
  return (
    <>
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>
          <Trans>Wallet</Trans>
          <p>{ENSName ?? ''}</p>
        </HeaderRow>
        <InfoCard topBorder>
          {ENSName && (
            <AccountControlWrapper>
              <AccountControl>
                <Copy toCopy={ENSName}>
                  <Trans>Copy Address</Trans>
                </Copy>
              </AccountControl>
              {chainId && (
                <AccountControl>
                  <AddressLink
                    hasENS={!!ENSName}
                    isENS={true}
                    href={getExplorerLink(chainId, ENSName, ExplorerDataType.ADDRESS)}
                  >
                    <LinkIcon />
                    <Trans>View on Explorer</Trans>
                  </AddressLink>
                </AccountControl>
              )}
            </AccountControlWrapper>
          )}
        </InfoCard>
        <InfoCard>
          <h4>
            <Trans>Wallet Name</Trans>
          </h4>
        </InfoCard>
      </UpperSection>
    </>
  )
}
