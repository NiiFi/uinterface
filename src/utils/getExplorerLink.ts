import { SupportedChainId } from '../constants/chains'

const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
  [SupportedChainId.NAHMII_MAINNET]: 'explorer.',
  [SupportedChainId.NAHMII_TESTNET]: 'explorer.testnet.',
}

export enum ExplorerDataType {
  TRANSACTION = 'transaction',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block',
}

/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
export function getExplorerLink(chainId: number, data: string, type: ExplorerDataType): string {
  // if (chainId === SupportedChainId.NAHMII) {
  //   switch (type) {
  //     case ExplorerDataType.TRANSACTION:
  //       return `https://explorer.nahmii.io/#/tx/${data}`
  //     case ExplorerDataType.ADDRESS:
  //       return `https://explorer.nahmii.io/#/address/${data}`
  //     case ExplorerDataType.BLOCK:
  //       return `https://explorer.nahmii.io/#/block/${data}`
  //     default:
  //       return `https://explorer.nahmii.io`
  //   }
  // }

  const prefix = `https://${ETHERSCAN_PREFIXES[chainId] ?? 'explorer.testnet.'}nahmii.io`

  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return `${prefix}/tx/${data}`

    case ExplorerDataType.TOKEN:
      return `${prefix}/token/${data}`

    case ExplorerDataType.BLOCK:
      return `${prefix}/blocks/${data}`

    case ExplorerDataType.ADDRESS:
      return `${prefix}/address/${data}`
    default:
      return `${prefix}`
  }
}
