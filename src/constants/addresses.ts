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
  [SupportedChainId.ROPSTEN_NAHMII]: '0x01a2aB72dd3A49700CFea8b87e9E6ba7Dfb64809',
}
export const ROUTER_ADDRESS: AddressMap = {
  [SupportedChainId.ROPSTEN]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  [SupportedChainId.ROPSTEN_NAHMII]: '0x682E2F5C4ad4106154EC11F92E96F6CBd01128bC',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {}
