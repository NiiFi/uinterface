import React from 'react'
import styled from 'styled-components/macro'
import { ChevronDown } from 'react-feather'

import { useBaseCurrency } from 'state/user/hooks'
import { SUPPORTED_BASE_CURRENCIES, SUPPORTED_BASE_CURRENCIES_MAP } from 'constants/tokens'
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
  max-width: 450px;
  max-height: 300px;
  gap: 1rem;
  overflow-y: scroll;
  flex-wrap: wrap;
`
const MenuItem = styled.div<{ active?: boolean }>`
  display: flex;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: ${({ theme, active }) => (active ? theme.bg5 : 'transparent')};
  color: ${({ theme }) => theme.text1};
  &:hover {
    background-color: ${({ theme }) => theme.bg5};
  }
`

export default function CurrencyDropdown() {
  const theme = useTheme()
  const { open, handleClick, handleClose, elementRef } = useDropdownProps()
  const { baseCurrency, baseCurrencyDetail, setBaseCurrency } = useBaseCurrency()
  return (
    <Wrapper>
      <MenuButton
        title={baseCurrencyDetail.label}
        color={theme.text1}
        ref={elementRef}
        active={open}
        onClick={handleClick}
      >
        <CurrencyAvatar
          rootStyle={{ fontSize: '1rem' }}
          iconProps={{ width: '1.5rem', height: '1.5rem' }}
          symbol={baseCurrencyDetail.id}
        />
        <ChevronDown size="1.25rem" />
      </MenuButton>
      <Menu anchorEl={elementRef.current} open={open} onClose={handleClose}>
        <MenuWrapper>
          {SUPPORTED_BASE_CURRENCIES.map((value, index) => (
            <MenuItem
              title={SUPPORTED_BASE_CURRENCIES_MAP[value].label}
              active={baseCurrency === value}
              key={index}
              onClick={() => {
                setBaseCurrency(value)
                handleClose()
              }}
            >
              <CurrencyAvatar symbol={value} />
            </MenuItem>
          ))}
        </MenuWrapper>
      </Menu>
    </Wrapper>
  )
}
