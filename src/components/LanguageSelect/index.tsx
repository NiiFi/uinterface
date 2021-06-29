import React, { useCallback } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import styled from 'styled-components/macro'
import { LanguageIcon } from '../Icons'
import { useAppDispatch } from 'state/hooks'
import { updateUserLocale } from 'state/user/actions'
import { useActiveLocale } from 'hooks/useActiveLocale'
import { SUPPORTED_LOCALES } from '../../constants/locales'

const LanguageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.bg4};
  & svg {
    margin-right: 2px;
  }
`
export default function LanguageSelect() {
  const currentLocale = useActiveLocale()
  const dispatch = useAppDispatch()
  const handleChange = useCallback(
    (event: any) => {
      dispatch(updateUserLocale({ userLocale: event.target.value }))
    },
    [dispatch]
  )
  return (
    <LanguageWrapper>
      <LanguageIcon />
      <Select
        labelId="language-select"
        id="lang-select"
        value={currentLocale}
        onClick={(e) => e.stopPropagation()}
        onChange={handleChange}
      >
        {SUPPORTED_LOCALES.map((locale, localeIdx) => (
          <MenuItem key={localeIdx} value={locale}>
            {locale.split('-')[0].toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </LanguageWrapper>
  )
}
