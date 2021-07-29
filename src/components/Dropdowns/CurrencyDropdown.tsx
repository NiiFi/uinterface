import React from 'react'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'
import { ChevronDown } from 'react-feather'

import { SUPPORTED_BASE_CURRENCIES } from 'constants/tokens'
import CurrencyAvatar from 'components/CurrencyAvatar'
import useDropdownProps from './useDropdownProps'
import { MenuButton } from './styled'
import Menu from '../Menu'
import useTheme from 'hooks/useTheme'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 0.5rem;
  width: 450px;
  height: 300px;
  gap: 1rem;
  overflow-y: scroll;
  flex-wrap: wrap;
`
const MenuItem = styled.div<{ active?: boolean }>`
  display: flex;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: ${({ theme, active }) => (active ? theme.bg5 : 'transprent')};
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
          {SUPPORTED_BASE_CURRENCIES.map((value, index) => (
            <MenuItem key={index}>
              <CurrencyAvatar symbol={value} />
            </MenuItem>
          ))}
        </MenuWrapper>
      </Menu>
    </Wrapper>
  )
}
