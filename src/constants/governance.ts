import { GOVERNANCE_ADDRESS, TIMELOCK_ADDRESS, UNI_ADDRESS } from './addresses'

export const COMMON_CONTRACT_NAMES: { [chainId: number]: { [address: string]: string } } = {
  [3]: {
    [UNI_ADDRESS[3]]: 'Ropsten UNI',
    [GOVERNANCE_ADDRESS[3]]: 'Ropsten Governance',
    [TIMELOCK_ADDRESS[3]]: 'Ropsten Timelock',
  },
}

export const DEFAULT_AVERAGE_BLOCK_TIME_IN_SECS = 13

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS: { [chainId: number]: number } = {
  [1]: DEFAULT_AVERAGE_BLOCK_TIME_IN_SECS,
}
