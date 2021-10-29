import { FACTORY_ADDRESS } from '@niifi/godzilla2-sdk'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const ETH_ADDRESS: AddressMap = {
  [SupportedChainId.ROPSTEN]: '0x4200000000000000000000000000000000000006',
  [SupportedChainId.ROPSTEN_NAHMII]: '0x4200000000000000000000000000000000000006',
}

export const NIIFI_ADDRESS: AddressMap = {
  [SupportedChainId.ROPSTEN]: '0x852e5427c86a3b46dd25e5fe027bb15f53c4bcb8',
  [SupportedChainId.ROPSTEN_NAHMII]: '0x852e5427c86a3b46dd25e5fe027bb15f53c4bcb8',
}

export const FACTORY_ADDRESSES: AddressMap = {
  [SupportedChainId.ROPSTEN]: FACTORY_ADDRESS,
  [SupportedChainId.ROPSTEN_NAHMII]: '0x11AB0Ca40B2E9Bf2c98718539cA1aD7486999E57',
}
export const ROUTER_ADDRESS: AddressMap = {
  [SupportedChainId.ROPSTEN]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  [SupportedChainId.ROPSTEN_NAHMII]: '0x38b5890E36cbc164A677d6A6192A39E8Fa9EcDf4',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {}
