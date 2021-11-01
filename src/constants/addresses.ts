import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const ETH_ADDRESS: AddressMap = {
  [SupportedChainId.NAHMII_MAINNET]: '0x4200000000000000000000000000000000000006',
  [SupportedChainId.NAHMII_TESTNET]: '0x4200000000000000000000000000000000000006',
}

export const NIIFI_ADDRESS: AddressMap = {
  [SupportedChainId.NAHMII_MAINNET]: '0x852e5427c86a3b46dd25e5fe027bb15f53c4bcb8',
  [SupportedChainId.NAHMII_TESTNET]: '0x852e5427c86a3b46dd25e5fe027bb15f53c4bcb8',
}

export const FACTORY_ADDRESSES: AddressMap = {
  [SupportedChainId.NAHMII_MAINNET]: '0x11AB0Ca40B2E9Bf2c98718539cA1aD7486999E57',
  [SupportedChainId.NAHMII_TESTNET]: '0x11AB0Ca40B2E9Bf2c98718539cA1aD7486999E57',
}
export const ROUTER_ADDRESS: AddressMap = {
  [SupportedChainId.NAHMII_MAINNET]: '0x38b5890E36cbc164A677d6A6192A39E8Fa9EcDf4',
  [SupportedChainId.NAHMII_TESTNET]: '0x38b5890E36cbc164A677d6A6192A39E8Fa9EcDf4',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {}
