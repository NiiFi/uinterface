import { createAction } from '@reduxjs/toolkit'

export type TokenName = 'ETH' | 'NII'
export type PoolToken = {
  symbol: TokenName // TODO: NEED TO COME UP WITH A BETTER TYPE/INTERFACE
  address: string
}
export type PoolTokenValue = PoolToken & {
  value: string
}
export type PoolInvestPair = {
  token0: PoolToken
  token1: PoolToken
}
export type PoolInvestPairValues = {
  token0: PoolTokenValue
  token1: PoolTokenValue
}
export const setInvestTokenPair = createAction<PoolInvestPair>('pool/setInvestTokenPair')
export const removeTokenPair = createAction('pool/removeTokenPair')
