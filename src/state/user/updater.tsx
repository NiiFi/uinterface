import { useEffect } from 'react'

import { useAppDispatch } from 'state/hooks'
import { BASE_CURRENCY_RATES_URL, BASE_CURRENCY_RATES_RESPONSE } from 'constants/tokens'
import useInterval from 'hooks/useInterval'
import useLazyFetch from 'hooks/useLazyFetch'

import { updateMatchesDarkMode, setEthereumToBaseCurrencyRates } from './actions'
import { setEthereumToBaseCurrencyRateApiState } from 'state/application/actions'

export default function Updater(): null {
  const dispatch = useAppDispatch()

  // keep dark mode in sync with the system
  useEffect(() => {
    const darkHandler = (match: MediaQueryListEvent) => {
      dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }))
    }

    const match = window?.matchMedia('(prefers-color-scheme: dark)')
    dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }))

    if (match?.addListener) {
      match?.addListener(darkHandler)
    } else if (match?.addEventListener) {
      match?.addEventListener('change', darkHandler)
    }

    return () => {
      if (match?.removeListener) {
        match?.removeListener(darkHandler)
      } else if (match?.removeEventListener) {
        match?.removeEventListener('change', darkHandler)
      }
    }
  }, [dispatch])

  return null
}

export function BaseCurrencyRatesUpdater() {
  const dispatch = useAppDispatch()
  const [baseCurrencyFetch, { data, error, loading }] =
    useLazyFetch<BASE_CURRENCY_RATES_RESPONSE>(BASE_CURRENCY_RATES_URL)

  useEffect(() => {
    // This is to make the API call for the first time when app loads
    baseCurrencyFetch()
  }, [baseCurrencyFetch])

  useInterval(() => {
    baseCurrencyFetch()
  }, 1000 * 60 * 5 /* 5 minutes */)

  useEffect(() => {
    if (data && data.ethereum) {
      const newData = Object.fromEntries(
        Object.entries(data.ethereum).map(([symbol, value]) => [symbol.toUpperCase(), value])
      )
      dispatch(setEthereumToBaseCurrencyRates(newData))
    }
  }, [data, dispatch])

  useEffect(() => {
    dispatch(setEthereumToBaseCurrencyRateApiState({ error, loading }))
  }, [error, loading, dispatch])

  return null
}
