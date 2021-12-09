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
  const RefetchIntervalDelay = 1000 * 60 * 5 /* 5 minutes */
  /**
   * @description
   * Purpose of this Component is to refetch the Currency Rates from the API.
   * At this point we are using "coingecko"
   * @see https://www.coingecko.com/en/api/documentation
   *
   * This task runs every 5 minutes.(see: useInterval hook below) It sets the latest results in the user's reducer of
   * redux store. Which eventually gets saved in the localStorage.
   * State Object looks something like this.
   * {
   *    "ethereumToBaseCurrencyRates": {
   *       "<CURRENCY_SYMBOL>": Number
   *    }
   *
   * }
   * @example
   * {
   *    "ethereumToBaseCurrencyRates": {
   *      "USD": 2201.10,
   *      "GBP": 1004.01
   *    }
   * }
   *
   * Reason for storing these values in the localStorage is to avoid unexpected behavior
   * on the UI.
   * @warning this could result in old data sometimes especially when api is
   * returning OR getting into error state.
   * @suggestion We can resolve this by indicating an icon depending
   * on the lastFetch date and indicate to the user that rates might be old. @see https://github.com/NiiFi/uinterface/issues/79
   *
   *
   * ================================
   * Possible Error cases seen so far.
   * ================================
   *
   * 1 - I have noticed that I was getting CORS and 403 error while calling this API.
   * It turns out that it was because of the internet provider was running some sort of
   * proxy OR VPN.
   *
   */
  const dispatch = useAppDispatch()
  const [baseCurrencyFetch, { data, error, loading }] =
    useLazyFetch<BASE_CURRENCY_RATES_RESPONSE>(BASE_CURRENCY_RATES_URL)

  useEffect(() => {
    // This is to make the API call for the first time when app loads
    baseCurrencyFetch()
  }, [baseCurrencyFetch])

  useInterval(() => {
    baseCurrencyFetch()
  }, RefetchIntervalDelay)

  useEffect(() => {
    if (data && data.prices) {
      const newData = Object.fromEntries(
        Object.entries(data.prices).map(([symbol, value]) => [symbol.toUpperCase(), value])
      )
      dispatch(setEthereumToBaseCurrencyRates(newData))
    }
  }, [data, dispatch])

  useEffect(() => {
    dispatch(setEthereumToBaseCurrencyRateApiState({ error, loading }))
  }, [error, loading, dispatch])

  return null
}
