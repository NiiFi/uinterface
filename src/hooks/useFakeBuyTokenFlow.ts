import { useEffect, useCallback } from 'react'
import { BuyTokenStates, setBuyTokenState } from 'state/user/actions'
import { useAppSelector, useAppDispatch } from 'state/hooks'

export default function useFakeBuyTokenFlow() {
  const buyState: BuyTokenStates = useAppSelector((state) => state.user.buyTokenState || 'buy')
  const dispatch = useAppDispatch()

  const handleBuy = useCallback(() => {
    dispatch(setBuyTokenState('process'))
  }, [dispatch])

  const handleDeposit = useCallback(() => {
    dispatch(setBuyTokenState('buy'))
  }, [dispatch])

  useEffect(() => {
    if (buyState === 'process') {
      const timeOut = setTimeout(() => {
        dispatch(setBuyTokenState('deposit'))
      }, 2000)
      return () => {
        clearTimeout(timeOut)
      }
    }
    return undefined
  }, [buyState, dispatch])

  return { buyState, handleBuy, handleDeposit }
}
