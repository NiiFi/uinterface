import useScrollPosition from '@react-hook/window-scroll'
import React, { useState } from 'react'

import { NavLink } from 'react-router-dom'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components/macro'
import { Box, RefreshCw, Airplay, Aperture, Compass, Feather } from 'react-feather'
import LanguageSelect from '../LanguageSelect'

import Logo from '../../assets/images/niifi-logo.png'

import { useActiveWeb3React } from '../../hooks/web3'
import { CardNoise } from '../earn/styled'
import { TYPE } from '../../theme'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import ClaimModal from '../claim/ClaimModal'
import { useToggleSelfClaimModal, useShowClaimPopup } from '../../state/application/hooks'
import { useUserHasAvailableClaim } from '../../state/claim/hooks'
import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
import { Dots } from '../swap/styleds'
import SocialLinks from '../SocialLinks'
import Modal from '../Modal'
import UniBalanceContent from './UniBalanceContent'

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 370px;
  top: 0;
  position: relative;
  position: relative;
  background-color: ${({ theme }) => theme.white};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding:  1rem;
    grid-template-columns: auto 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.bg3}
    ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const HeaderRow = styled(RowFixed)`
  width: 100%;

  &:first-child {
    margin-top: 0px;
    margin-bottom: 1rem;
  }

  &:nth-child(2) {
    margin-bottom: 2rem;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  background-color: transparent;
  width: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: flex-end;
  `};
`
const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
`
const HeaderContainer = styled(HeaderContent)`
  height: 100%;
  padding: 0px;
  border-right: 1px solid ${({ theme }) => theme.bg3};
`
const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg2)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
`

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  background-color: white;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const UniIcon = styled.div``

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.bg4};
  font-size: 1rem;
  width: 100%;
  font-weight: 500;
  padding: 12px 12px;
  word-break: break-word;

  > i,
  svg {
    margin-right: 5px;
  }
  &.${activeClassName}, :hover,
  :focus {
    font-weight: 700;
    background-color: ${({ theme }) => theme.bg5};
    border-radius: 8px;
    color: ${({ theme }) => theme.primary1};
  }

  :hover,
  :focus {
    font-weight: 700;
  }
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg2};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const SidebarLinks: Array<{ title: string; id: string; Icon: any; link: string }> = [
  {
    id: 'discover',
    title: t`Discover`,
    Icon: Compass,
    link: '/discover',
  },
  {
    id: 'dashboard',
    link: '/dashboard',
    title: t`Dashboard`,
    Icon: Airplay,
  },
  {
    id: 'swap',
    link: '/swap',
    title: t`Swap`,
    Icon: RefreshCw,
  },
  {
    id: 'pool',
    link: '/pool',
    title: t`Pool`,
    Icon: Box,
  },
  {
    id: 'farm',
    link: '/farm',
    title: t`Farm`,
    Icon: Feather,
  },
  {
    id: 'lend',
    link: '/lend',
    title: t`Lend`,
    Icon: Aperture,
  },
]

export default function Header() {
  const { account } = useActiveWeb3React()

  const toggleClaimModal = useToggleSelfClaimModal()

  const availableClaim: boolean = useUserHasAvailableClaim(account)

  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
  const showClaimPopup = useShowClaimPopup()
  const scrollY = useScrollPosition()

  return (
    <HeaderFrame showBackground={scrollY > 45}>
      <ClaimModal />
      <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
        <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal>
      <HeaderContainer>
        <HeaderContent>
          <HeaderRow>
            <Title href=".">
              <UniIcon>
                <img width={'100%'} src={Logo} alt="logo" />
              </UniIcon>
            </Title>
          </HeaderRow>
          <HeaderRow>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              <Web3Status />
            </AccountElement>
          </HeaderRow>
          <HeaderLinks>
            {SidebarLinks.map(({ Icon, link, id, title }, index) => (
              <StyledNavLink id={`${id}-nav-link`} to={link} key={index}>
                <Icon />
                <Trans>{title}</Trans>
              </StyledNavLink>
            ))}
          </HeaderLinks>
        </HeaderContent>
        <HeaderControls>
          <HeaderElement>
            {availableClaim && !showClaimPopup && (
              <UNIWrapper onClick={toggleClaimModal}>
                <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                  <TYPE.white padding="0 2px">
                    {claimTxn && !claimTxn?.receipt ? (
                      <Dots>
                        <Trans>Claiming UNI</Trans>
                      </Dots>
                    ) : (
                      <Trans>Claim UNI</Trans>
                    )}
                  </TYPE.white>
                </UNIAmount>
                <CardNoise />
              </UNIWrapper>
            )}
          </HeaderElement>
          <HeaderElementWrap>
            <LanguageSelect />
            <SocialLinks />
          </HeaderElementWrap>
        </HeaderControls>
      </HeaderContainer>
    </HeaderFrame>
  )
}
