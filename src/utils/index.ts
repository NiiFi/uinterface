import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { Token } from '@niifi/godzilla2-sdk'
import numeral from 'numeral'
import { formatDistance } from 'date-fns'
import { TokenAddressMap } from '../state/lists/hooks'

export interface Dictionary {
  [key: string]: string | boolean | number | Dictionary[] | Dictionary | undefined
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function shortenDecimalValues(value: string, formatType?: string): string {
  const valueNumber = Number(value)
  if (valueNumber === 0) return '0'

  let format = formatType
  if (!format) {
    if (valueNumber >= 1.0e9) {
      return (valueNumber / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
    } else if (valueNumber >= 1000) {
      format = '0,0.00'
    } else if (valueNumber >= 1) {
      format = '0,0.0000'
    } else {
      const repeatCount = Math.abs(Math.floor(Math.log(valueNumber) / Math.log(10) + 1))
      format = '0,0.' + '0'.repeat(Number.isFinite(repeatCount) ? repeatCount : 0) + '0000'
    }
  }

  const valueFormatted = numeral(valueNumber).format(format)
  // workaround for small numbers and NaN https://github.com/adamwdraper/Numeral-js/issues/596
  return valueFormatted !== 'NaN' ? valueFormatted : '0'
}

export function formatTimeStamp(value: string): string {
  const timeStampNumber = Number(value)
  return formatDistance(new Date(timeStampNumber), new Date(), { addSuffix: true })
}
// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(tokenAddressMap: TokenAddressMap, token?: Token): boolean {
  return Boolean(token?.isToken && tokenAddressMap[token.chainId]?.[token.address])
}

export const currentTimestamp = () => new Date().getTime()

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}
