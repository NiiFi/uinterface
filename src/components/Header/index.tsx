import useScrollPosition from '@react-hook/window-scroll'
import React from 'react'

import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Trans, t } from '@lingui/macro'
import LanguageDropdown from '../Dropdowns/LanguageDropdown'

import LightLogo from '../../assets/images/niifi-logo-light.png'
import DarkLogo from '../../assets/images/niifi-logo-dark.png'
import ThemeSwitch from '../ThemeSwitch'
import { DashboardIcon, PoolIcon, SwapIcon, LendIcon, DiscoverIcon, FarmIcon } from '../Icons'

import Row, { RowFixed, RowBetween, RowStart } from '../Row'
import SocialLinks from '../SocialLinks'
import WalletPopover from './WalletListPopover'
import { useIsDarkMode } from 'state/user/hooks'

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 19px);
  width: 370px;
  top: 0;
  position: relative;
  background-color: ${({ theme }) => theme.white};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: auto 1fr;
    height: calc(100vh - 38px);
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
  padding: 0.5rem 1rem 0px 1rem;
  border-top: 1px solid ${({ theme }) => theme.bg3};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  flex-direction: column;
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
    margin-bottom: 1rem;
  }
  &:nth-child(2):hover {
    background-color: ${({ theme }) => theme.bg5};
    border-radius: 8px;
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
  gap: 0.5rem;
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
  padding: 1rem 0px;
  border-right: 1px solid ${({ theme }) => theme.bg3};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    border-right: 0px;
  `}
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  background-color: ${({ theme }) => theme.white};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
  text-decoration: none;
`

const NiiIcon = styled.div`
  > div {
    width: 35%;
    height: auto;
    display: flex;
  }
  > div > img {
    width: 100%;
    min-width: 100%;
    height: 100%;
  }
  > div > span {
    color: ${({ theme }) => theme.text4};
    padding-left: 5px;
  }
`
const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})<{ disable?: number }>`
  ${({ theme }) => theme.flexRowNoWrap}
  outline: none;
  cursor: ${({ disable }) => (disable ? 'not-allowed' : 'pointer')};
  text-decoration: none;
  color: ${({ theme, disable }) => (disable ? theme.text3 : theme.text4)};
  font-size: 1rem;
  width: 100%;
  font-weight: 400;
  padding: 12px 12px;
  word-break: break-word;
  display: flex;
  align-items: center;
  pointer-events: ${({ disable }) => (disable ? 'none' : 'auto')};

  > i,
  svg {
    margin-right: 18px;
  }
  &.${activeClassName}, :hover,
  :focus {
    font-weight: 400;
    background-color: ${({ theme, disable }) => (disable ? 'none' : theme.bg5)};
    border-radius: 8px;
    color: ${({ theme, disable }) => (disable ? theme.text4 : theme.primary1)};
  }

  :hover,
  :focus {
    font-weight: 400;
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

export default function Header() {
  const isDarkMode = useIsDarkMode()

  const SidebarLinks: Array<{ title: string; id: string; Icon: any; link: string; disable: boolean }> = [
    {
      id: 'discover',
      title: t`Discover`,
      Icon: DiscoverIcon,
      link: '/discover',
      disable: false,
    },
    {
      id: 'dashboard',
      link: '/dashboard',
      title: t`Dashboard`,
      Icon: DashboardIcon,
      disable: false,
    },
    {
      id: 'swap',
      link: '/swap',
      title: t`Swap`,
      Icon: SwapIcon,
      disable: false,
    },
    {
      id: 'pool',
      link: '/pools',
      title: t`Pools`,
      Icon: PoolIcon,
      disable: false,
    },
    {
      id: 'farm',
      link: '/farm',
      title: t`Farm`,
      Icon: FarmIcon,
      disable: true,
    },
    {
      id: 'lend',
      link: '/lend',
      title: t`Lend`,
      Icon: LendIcon,
      disable: true,
    },
  ]

  const scrollY = useScrollPosition()
  const Logo = isDarkMode ? LightLogo : DarkLogo

  return (
    <HeaderFrame showBackground={scrollY > 45}>
      <HeaderContainer>
        <HeaderContent>
          <HeaderRow>
            <Title href=".">
              <NiiIcon>
                <div>
                  <img src={Logo} alt="logo" /> <span>beta</span>
                </div>
              </NiiIcon>
            </Title>
          </HeaderRow>
          <WalletPopover />
          <HeaderLinks>
            {SidebarLinks.map(({ Icon, link, id, title, disable }, index) => (
              <StyledNavLink
                id={`${id}-nav-link`}
                disable={+disable}
                to={link}
                key={index}
                isActive={(match, location) => {
                  const isPoolDetails = link === '/pools' && location.pathname.indexOf('/pool/0x') !== -1
                  return match !== null || isPoolDetails
                }}
              >
                <Icon />
                <Trans>{title}</Trans>
              </StyledNavLink>
            ))}
          </HeaderLinks>
        </HeaderContent>
        <HeaderControls>
          <HeaderElementWrap>
            <RowBetween style={{ marginBottom: '0.5rem' }}>
              <LanguageDropdown />
              <ThemeSwitch />
            </RowBetween>
            <RowStart>
              <SocialLinks />
            </RowStart>
          </HeaderElementWrap>
        </HeaderControls>
      </HeaderContainer>
    </HeaderFrame>
  )
}
