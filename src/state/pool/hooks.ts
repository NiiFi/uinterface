import { useCallback } from 'react'
import { AppState } from '../index'

import {
  PoolInvestPair,
  setInvestTokenPair,
  removeTokenPair,
  PoolToken,
  PoolTokenValue,
  PoolInvestPairValues,
} from './actions'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { useEthereumToBaseCurrencyRatesAndApiState } from 'state/user/hooks'

export function usePoolState(): AppState['pool'] {
  return useAppSelector((state) => state.pool)
}
export function usePoolInvestTokenPair(): PoolInvestPair | null {
  const { investPair } = usePoolState()
  return investPair
}

export function useSetUnSetPoolInvestTokenPair() {
  const dispatch = useAppDispatch()
  const setPoolInvestTokenPair = useCallback(
    ({ token0, token1 }: PoolInvestPair) => {
      dispatch(setInvestTokenPair({ token0, token1 }))
    },
    [dispatch]
  )
  const unSetPoolInvestTokenPair = useCallback(() => {
    dispatch(removeTokenPair())
  }, [dispatch])

  return { setPoolInvestTokenPair, unSetPoolInvestTokenPair }
}

export function useFakePoolValuesCalculator() {
  /**
   * @description
   * @see https://github.com/NiiFi/uinterface/issues/82
   */
  const { ethereumToBaseCurrencyRates: rates } = useEthereumToBaseCurrencyRatesAndApiState()
  const ONE_USD = 154
  const ONE_ETH_IN_USD = rates?.['USD'] || 500 * ONE_USD
  const ONE_NII_IN_USD = 0.25 * ONE_USD
  const ROI_PER_DAY_RATIO = 0.001
  /**
   * NOTE: These set of functions are dummy and not permanent.
   * We need to remove these in the future.
   */
  const getUSDValue = useCallback(
    (token: PoolTokenValue) => {
      if (token.symbol === 'ETH') {
        return Number(token.value) * ONE_ETH_IN_USD
      }
      return Number(token.value) * ONE_NII_IN_USD
    },
    [ONE_ETH_IN_USD, ONE_NII_IN_USD]
  )

  function getROIValueByPeriod(period: string, token: PoolTokenValue) {
    if (period === 'oneMonth') return Number(token.value) * (ROI_PER_DAY_RATIO * 30)
    if (period === 'oneWeek') return Number(token.value) * (ROI_PER_DAY_RATIO * 7)
    return Number(token.value) * (ROI_PER_DAY_RATIO * 360)
  }

  const calculateTotalInvestmentInUSD = useCallback(
    ({ token0, token1 }: PoolInvestPairValues) => {
      const token0USD = getUSDValue(token0)
      const token1USD = getUSDValue(token1)
      return `${token0USD + token1USD}`
    },
    [getUSDValue]
  )

  const getValueEquivalentTo = (compareTo: PoolToken, compareToValue: string, compare: PoolToken) => {
    const Million = 100_000
    if (compareTo.symbol === 'NII' && compare.symbol === 'ETH') {
      return `${Number(compareToValue) / Million}`
    }
    return `${Number(compareToValue) * Million}`
  }

  const calculateEstimatedROI = ({ token0, token1 }: PoolInvestPairValues, period: string) => {
    const token0ROI = getROIValueByPeriod(period, token0)
    const token1ROI = getROIValueByPeriod(period, token1)
    const token0ROIInUSD = getUSDValue({ ...token0, value: `${token0ROI}` })
    const token1ROIInUSD = getUSDValue({ ...token1, value: `${token1ROI}` })
    return {
      token0: `${token0ROI}`,
      token1: `${token1ROI}`,
      roiInUSD: `${token0ROIInUSD + token1ROIInUSD}`,
    }
  }
  return { calculateTotalInvestmentInUSD, getValueEquivalentTo, calculateEstimatedROI }
}
