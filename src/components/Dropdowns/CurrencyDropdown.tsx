import React from 'react'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'

import { ChevronDown } from 'react-feather'
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
  flex-direction: column;
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
          <MenuItem active={true}>
            <Trans>USD</Trans>
          </MenuItem>
        </MenuWrapper>
      </Menu>
    </Wrapper>
  )
}
