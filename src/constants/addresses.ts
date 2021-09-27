import { FACTORY_ADDRESS } from '@uniswap/v2-sdk'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')
export const NIIFI_ADDRESS: AddressMap = {
  [SupportedChainId.ROPSTEN]: '0x852e5427c86a3b46dd25e5fe027bb15f53c4bcb8',
  [SupportedChainId.ROPSTEN_NAHMII]: '0x852e5427c86a3b46dd25e5fe027bb15f53c4bcb8',
}
// export const MULTICALL2_ADDRESSES: AddressMap = {
//   ...constructSameAddressMap('0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696'),
// }
// export const FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(FACTORY_ADDRESS) // TODO: use FACTORY_ADDRESS below after switching to forked version
export const FACTORY_ADDRESSES: AddressMap = {
  [SupportedChainId.ROPSTEN]: FACTORY_ADDRESS,
  [SupportedChainId.ROPSTEN_NAHMII]: '0x01a2aB72dd3A49700CFea8b87e9E6ba7Dfb64809',
}
export const ROUTER_ADDRESS: AddressMap = {
  [SupportedChainId.ROPSTEN]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  [SupportedChainId.ROPSTEN_NAHMII]: '0x682E2F5C4ad4106154EC11F92E96F6CBd01128bC',
}
export const GOVERNANCE_ADDRESS: AddressMap = constructSameAddressMap('0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F')
// export const TIMELOCK_ADDRESS: AddressMap = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')
export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {}
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.ROPSTEN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  // [SupportedChainId.ROPSTEN_NAHMII]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {}
