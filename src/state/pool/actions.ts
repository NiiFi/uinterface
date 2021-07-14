import { createAction } from '@reduxjs/toolkit'

export type PoolToken = {
  symbol: string
  address: string
}
export type PoolInvestPair = {
  token0: PoolToken
  token1: PoolToken
}
export const setInvestTokenPair = createAction<PoolInvestPair>('pool/setInvestTokenPair')
export const removeTokenPair = createAction('pool/removeTokenPair')
