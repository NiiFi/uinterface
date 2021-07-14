import { useCallback } from 'react'
import { AppState } from '../index'

import { PoolInvestPair, setInvestTokenPair, removeTokenPair } from './actions'
import { useAppDispatch, useAppSelector } from 'state/hooks'

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
