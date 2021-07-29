import React from 'react'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'

import { ChevronDown } from 'react-feather'
import useDropdownProps from './useDropdownProps'
import { MenuButton } from './styled'
import Menu from '../Menu'
import useTheme from 'hooks/useTheme'
import {
  USD,
  ETH,
  CAD,
  CHF,
  INR,
  HKD,
  BTC,
  EUR,
  CNY,
  GBP,
  RUB,
  MXN,
  KRW,
  TRY,
  JPY,
  BRL,
  SEK,
  AUD,
  NOK,
  SGD,
} from 'components/Icons'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 0.5rem;
`
const MenuItem = styled.div<{ active?: boolean }>`
  display: flex;
  padding: 1rem 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: ${({ theme, active }) => (active ? theme.bg5 : 'none')};
  color: ${({ theme }) => theme.text1};
  &:hover {
    background-color: ${({ theme }) => theme.bg5};
  }
`

export default function CurrencyDropdown() {
  const theme = useTheme()
  const { open, handleClick, handleClose, elementRef } = useDropdownProps()
  return (
    <Wrapper>
      <MenuButton color={theme.text1} ref={elementRef} active={open} onClick={handleClick}>
        <Trans>USD</Trans>
        <ChevronDown />
      </MenuButton>
      <Menu anchorEl={elementRef.current} open={open} onClose={handleClose}>
        <MenuWrapper>
          <USD />
          <CAD />
          <CHF />
          <INR />
          <HKD />
          <BTC />
          <EUR />
          <CNY />
          <GBP />
          <RUB />
          <MXN />
          <KRW />
          <TRY />
          <JPY />
          <BRL />
          <SEK />
          <AUD />
          <NOK />
          <SGD />
          <ETH />
        </MenuWrapper>
      </Menu>
    </Wrapper>
  )
}
