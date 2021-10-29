import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { SupportedChainId } from '../constants/chains'
import getLibrary from '../utils/getLibrary'

import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY
const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

const NETWORK_URLS: {
  [chainId in SupportedChainId]: string
} = {
  [SupportedChainId.ROPSTEN_NAHMII]: process.env.REACT_APP_ROPSTEN_NAHMII_RPC || 'https://l2.testnet.nahmii.io/',
}

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [SupportedChainId.ROPSTEN_NAHMII]

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: SupportedChainId.ROPSTEN_NAHMII,
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
})

// TODO: check for fortmatic usage and remove it if not needed

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1,
})
