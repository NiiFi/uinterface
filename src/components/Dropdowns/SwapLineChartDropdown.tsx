import React from 'react'
import styled from 'styled-components/macro'
import { Trans, t } from '@lingui/macro'

import { ChevronDown } from 'react-feather'
import useDropdownProps from './useDropdownProps'
import { MenuButton } from './styled'
import Menu from '../Menu'
import useTheme from 'hooks/useTheme'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;
  margin-left: -8px;
`
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 125px;
  padding: 0px 0.5rem;
`
const MenuItem = styled.div<{ active?: boolean }>`
  display: flex;
  padding: 1rem 0.5rem;
  cursor: pointer;
  margin: 0.15rem;
  border-radius: 0.5rem;
  background-color: ${({ theme, active }) => (active ? theme.bg5 : 'none')};
  color: ${({ theme }) => theme.text1};
  &:hover {
    background-color: ${({ theme }) => theme.bg5};
  }
`

export default function SwapLineChartDropdown({
  onItemSelect,
  selectedItem,
}: {
  selectedItem: string
  onItemSelect: (type: string) => void
}) {
  const theme = useTheme()
  const { open, handleClick, handleClose, elementRef } = useDropdownProps()
  const Options = [
    {
      label: t`Liquidity`,
      value: 'value1',
    },
    {
      label: t`Volume`,
      value: 'value2',
    },
    {
      label: t`Fees`,
      value: 'value3',
    },
  ]
  const onClick = (value: string) => {
    handleClose()
    onItemSelect(value)
  }
  const OptionsMap: { [key: string]: string } = {
    value1: t`Liquidity`,
    value2: t`Volume`,
    value3: t`Fees`,
  }
  return (
    <Wrapper>
      <MenuButton color={theme.text1} ref={elementRef} active={open} onClick={handleClick}>
        <Trans>{OptionsMap[selectedItem]}</Trans>
        <ChevronDown />
      </MenuButton>
      <Menu anchorEl={elementRef.current} open={open} onClose={handleClose}>
        <MenuWrapper>
          {Options.map((option, index) => (
            <MenuItem key={index} active={option.value === selectedItem} onClick={() => onClick(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </MenuWrapper>
      </Menu>
    </Wrapper>
  )
}
