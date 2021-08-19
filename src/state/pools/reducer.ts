import { createReducer } from '@reduxjs/toolkit'
import { currentTimestamp } from 'utils/index'
import { Transaction } from './types'
import { addPoolKeys, updatePoolData /*, updatePoolChartData*/ } from './actions'

export interface PoolData {
  // basic token info
  address: string
  feeTier: number

  token0: {
    name: string
    symbol: string
    address: string
    decimals: number
    derivedETH: number
  }

  token1: {
    name: string
    symbol: string
    address: string
    decimals: number
    derivedETH: number
  }

  // for tick math
  liquidity: number
  sqrtPrice: number
  tick: number

  // volume
  volumeUSD: number
  volumeUSDChange: number
  volumeUSDWeek: number

  // liquidity
  tvlUSD: number
  tvlUSDChange: number

  // prices
  token0Price: number
  token1Price: number

  // token amounts
  tvlToken0: number
  tvlToken1: number
}

export type PoolChartEntry = {
  date: number
  volumeUSD: number
  totalValueLockedUSD: number
}

export interface PoolsState {
  byAddress: {
    [address: string]: {
      data: PoolData | undefined
      chartData: PoolChartEntry[] | undefined
      transactions: Transaction[] | undefined
      lastUpdated: number | undefined
      // tickData: PoolTickData | undefined
    }
  }
}

export const initialState: PoolsState = { byAddress: {} }

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updatePoolData, (state, { payload: { pools } }) => {
      pools.map((poolData) => {
        const pool = poolData[0]
        const poolId = pool ? pool.id : undefined
        return (state.byAddress[poolId] = {
          ...state.byAddress[poolId],
          data: pool,
          lastUpdated: currentTimestamp(),
        })
      })
    })
    // add address to byAddress keys if not included yet
    .addCase(addPoolKeys, (state, { payload: { poolAddresses } }) => {
      poolAddresses.map((address) => {
        if (!state.byAddress[address]) {
          state.byAddress[address] = {
            data: undefined,
            chartData: undefined,
            transactions: undefined,
            lastUpdated: undefined,
            // tickData: undefined,
          }
        }
      })
    })
)
