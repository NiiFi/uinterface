import { createReducer } from '@reduxjs/toolkit'
import { isAddress } from 'utils'
import { updateTokenBalances } from './actions'

export function balanceKey({
  chainId,
  address,
  tokenAddress,
}: {
  chainId: number
  address: string
  tokenAddress?: string // undefined for ETH
}): string {
  return `${chainId}-${address}-${tokenAddress ?? 'ETH'}`
}

interface WalletState {
  readonly tokenBalanceListeners: {
    readonly [address: string]: {
      // the number of listeners for each address/token combo
      readonly [tokenAddress: string]: number
    }
  }

  readonly balanceListeners: {
    // the number of ether balance listeners for each address
    readonly [address: string]: number
  }

  readonly balances: {
    readonly [balanceKey: string]: {
      readonly value: string
      readonly blockNumber: number | undefined
    }
  }
}

const initialState: WalletState = {
  balanceListeners: {},
  tokenBalanceListeners: {},
  balances: {},
}

export default createReducer(initialState, (builder) =>
  builder.addCase(updateTokenBalances, (state, { payload: { chainId, address, blockNumber, tokenBalances } }) => {
    const checksummedAddress = isAddress(address)
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>', address, tokenBalances, checksummedAddress, blockNumber)
    if (!checksummedAddress) return
    Object.keys(tokenBalances).forEach((tokenAddress) => {
      const checksummedTokenAddress = isAddress(tokenAddress)
      if (!checksummedTokenAddress) return
      const balance = tokenBalances[checksummedTokenAddress]
      const key = balanceKey({ chainId, address: checksummedAddress, tokenAddress: checksummedTokenAddress })
      const data = state.balances[key]
      console.log([
        '>>>>>>>>>>>>>>>>>>>>>>>>>>>',
        tokenBalances,
        checksummedTokenAddress,
        tokenBalances[checksummedTokenAddress],
        balance,
        data,
        tokenAddress,
      ])
      if (!data || data.blockNumber === undefined || data.blockNumber <= blockNumber) {
        state.balances[key] = { value: balance, blockNumber }
      }
    })
  })
)
