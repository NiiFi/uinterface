import { createReducer } from '@reduxjs/toolkit'
import { PoolInvestPair, setInvestTokenPair, removeTokenPair } from './actions'

export interface PoolState {
  investPair: PoolInvestPair | null
}

const initialState: PoolState = {
  investPair: null,
}

export default createReducer<PoolState>(initialState, (builder) =>
  builder
    .addCase(setInvestTokenPair, (state, { payload: { token0, token1 } }) => {
      return {
        ...state,
        investPair: {
          token0,
          token1,
        },
      }
    })
    .addCase(removeTokenPair, (state) => {
      return {
        ...state,
        investPair: null,
      }
    })
)
