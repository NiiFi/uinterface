import { SupportedChainId } from '../constants/chains'

export function constructSameAddressMap<T extends string>(address: T): { [chainId: number]: T } {
  return {
    [SupportedChainId.NAHMII_TESTNET]: address,
  }
}
