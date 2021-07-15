import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import { t } from '@lingui/macro'
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
  width: 125px;
  flex-direction: column;
  padding: 0px 0.5rem;
  max-height: 350px;
  overflow-y: scroll;
`
const MenuItem = styled.div<{ active?: boolean }>`
  margin-bottom: 2px;
  margin-top: 2px;
  display: flex;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: ${({ theme, active }) => (active ? theme.bg5 : 'none')};
  color: ${({ theme }) => theme.text1};
  &:hover {
    background-color: ${({ theme }) => theme.bg5};
  }
`

export default function SwapTableDropdown({
  onItemSelect,
  selectedItem,
}: {
  selectedItem: string
  onItemSelect: (type: string) => void
}) {
  const Options = [
    {
      label: t`All`,
      value: 'All',
    },
    {
      label: t`Swaps`,
      value: 'Swap',
    },
    {
      label: t`Adds`,
      value: 'Mint',
    },
    {
      label: t`Removes`,
      value: 'Burn',
    },
  ]
  const OptionsMap: { [key: string]: string } = {
    All: 'All',
    Swap: 'Swap',
    Mint: 'Adds',
    Burn: 'Remove',
  }
  const theme = useTheme()
  const { open, handleClick, handleClose, elementRef } = useDropdownProps()

  const onOptionClicked = useCallback(
    (value: string) => {
      onItemSelect(value)
      handleClose()
    },
    [handleClose, onItemSelect]
  )
  const currentValue = OptionsMap[selectedItem]
  return (
    <Wrapper>
      <MenuButton color={theme.text1} ref={elementRef} active={open} onClick={handleClick}>
        {currentValue}
        <ChevronDown />
      </MenuButton>
      <Menu anchorEl={elementRef.current} open={open} onClose={handleClose}>
        <MenuWrapper>
          {Options.map((option, index) => (
            <MenuItem active={selectedItem === option.value} key={index} onClick={() => onOptionClicked(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </MenuWrapper>
      </Menu>
    </Wrapper>
  )
}
