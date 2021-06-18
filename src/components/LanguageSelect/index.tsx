import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { useAppDispatch } from 'state/hooks'
import { updateUserLocale } from 'state/user/actions'
import { useActiveLocale } from 'hooks/useActiveLocale'
import { SUPPORTED_LOCALES, LOCALE_LABEL } from '../../constants/locales'

export default function LanguageSelect() {
  const currentLocale = useActiveLocale()
  const dispatch = useAppDispatch()
  const handleChange = (e: any) => {
    dispatch(updateUserLocale(e.target.value))
  }
  return (
    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={currentLocale} onChange={handleChange}>
      {SUPPORTED_LOCALES.map((locale, localeIdx) => (
        <MenuItem key={localeIdx} value={locale}>
          {LOCALE_LABEL[locale]}
        </MenuItem>
      ))}
    </Select>
  )
}
