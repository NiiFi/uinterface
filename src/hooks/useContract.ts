import { Contract } from '@ethersproject/contracts'
import { abi as IUniswapV2PairABI } from 'abis/v2-pair.json'
import { abi as IUniswapV2Router02ABI } from 'abis/v2-router02.json'

import ARGENT_WALLET_DETECTOR_ABI from 'abis/argent-wallet-detector.json'
import ENS_PUBLIC_RESOLVER_ABI from 'abis/ens-public-resolver.json'
import ERC20_ABI from 'abis/erc20.json'
import ERC20_BYTES32_ABI from 'abis/erc20_bytes32.json'
import WETH_ABI from 'abis/weth.json'
import EIP_2612 from 'abis/eip_2612.json'

import { ARGENT_WALLET_DETECTOR_ADDRESS, ROUTER_ADDRESS } from 'constants/addresses'
import { useMemo } from 'react'
import { getContract } from 'utils'
import { Erc20, ArgentWalletDetector, EnsPublicResolver, Weth } from '../abis/types'
import { WETH9_EXTENDED } from '../constants/tokens'
import { useActiveWeb3React } from './web3'
import { PROTOCOL_DATA_PROVIDER_ADDRESS, LENDING_POOL_CONTRACT_ADDRESS } from 'constants/general'
import DATA_PROVIDER_ABI from 'abis/lending-protocol-data-provider.json'
import LENDING_POOL_ABI from 'abis/lending-pool.json'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean) {
  const { chainId } = useActiveWeb3React()
  return useContract<Weth>(chainId ? WETH9_EXTENDED[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useArgentWalletDetectorContract() {
  return useContract<ArgentWalletDetector>(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612, false)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useV2RouterContract(): Contract | null {
  return useContract(ROUTER_ADDRESS, IUniswapV2Router02ABI, true)
}

export function useProtocolDataProviderContract(): Contract | null {
  return useContract(PROTOCOL_DATA_PROVIDER_ADDRESS, DATA_PROVIDER_ABI, true)
}

export function useLendingPoolContract(): Contract | null {
  return useContract(LENDING_POOL_CONTRACT_ADDRESS, LENDING_POOL_ABI, true)
}
