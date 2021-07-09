import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'
import { LanguageIcon } from '../Icons'
import { useAppDispatch } from 'state/hooks'
import { updateUserLocale } from 'state/user/actions'
import { useActiveLocale } from 'hooks/useActiveLocale'
import { SUPPORTED_LOCALES, LOCALE_LABEL } from '../../constants/locales'

import useDropdownProps from './useDropdownProps'
import { MenuButton } from './styled'
import Menu from '../Menu'

const LanguageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.text4};
  svg {
    margin-right: 2px;
  }
`
const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0.5rem;
  max-height: 350px;
  overflow-y: scroll;
`
const MenuItem = styled.div<{ active?: boolean }>`
  margin-bottom: 2px;
  margin-top: 2px;
  display: flex;
  padding: 1rem 0.5rem;
  line-height: 18px;
  cursor: pointer;
  border-radius: 0.5rem;
  background-color: ${({ theme, active }) => (active ? theme.bg5 : 'none')};
  color: ${({ theme }) => theme.text1};
  &:hover {
    background-color: ${({ theme }) => theme.bg5};
  }
`

export default function LanguageDropdown() {
  const { open, handleClick, handleClose, elementRef } = useDropdownProps()
  const currentLocale = useActiveLocale()
  const dispatch = useAppDispatch()
  const handleChange = useCallback(
    (locale: any) => {
      dispatch(updateUserLocale({ userLocale: locale }))
      handleClose()
    },
    [dispatch, handleClose]
  )
  return (
    <LanguageWrapper>
      <MenuButton
        ref={elementRef}
        active={open}
        onClick={(e) => {
          e.stopPropagation()
          handleClick()
        }}
      >
        <LanguageIcon />
        <Trans>{currentLocale.split('-')[0].toUpperCase()}</Trans>
      </MenuButton>
      <Menu id="simple-menu" anchorEl={elementRef.current} open={open} onClose={handleClose}>
        <MenuWrapper>
          {SUPPORTED_LOCALES.map((locale, index) => (
            <MenuItem key={index} active={locale === currentLocale} onClick={() => handleChange(locale)}>
              {LOCALE_LABEL[locale]}
            </MenuItem>
          ))}
        </MenuWrapper>
      </Menu>
    </LanguageWrapper>
  )
}
