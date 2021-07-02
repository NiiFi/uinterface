import { FACTORY_ADDRESS as V2_FACTORY_ADDRESS } from '@uniswap/v2-sdk'
import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS } from '../utils/constants'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')
export const MULTICALL2_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696'),
}
export const V2_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V2_FACTORY_ADDRESS)
export const V2_ROUTER_ADDRESS: AddressMap = constructSameAddressMap('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D')
export const GOVERNANCE_ADDRESS: AddressMap = constructSameAddressMap('0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F')
export const TIMELOCK_ADDRESS: AddressMap = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')
export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {}
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.ROPSTEN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {}
