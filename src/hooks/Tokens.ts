import { parseBytes32String } from '@ethersproject/strings'
import { Currency, Token } from '@uniswap/sdk-core'
import { arrayify } from 'ethers/lib/utils'
import { useMemo, useEffect, useState } from 'react'
import { createTokenFilterFunction } from '../components/SearchModal/filtering'
import { ExtendedEther, WETH9_EXTENDED } from '../constants/tokens'
import { useAllLists, useCombinedActiveList, useInactiveListUrls } from '../state/lists/hooks'
import { WrappedTokenInfo } from '../state/lists/wrappedTokenInfo'
import { useUserAddedTokens } from '../state/user/hooks'
import { isAddress } from '../utils'
import { TokenAddressMap, useUnsupportedTokenList } from './../state/lists/hooks'

import { useActiveWeb3React } from './web3'

import { getContract } from 'utils'
import ERC20_ABI from 'abis/erc20.json'

// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(tokenMap: TokenAddressMap, includeUserAdded: boolean): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const userAddedTokens = useUserAddedTokens()

  return useMemo(() => {
    if (!chainId) return {}

    // reduce to just tokens
    const mapWithoutUrls = Object.keys(tokenMap[chainId] ?? {}).reduce<{ [address: string]: Token }>(
      (newMap, address) => {
        newMap[address] = tokenMap[chainId][address].token
        return newMap
      },
      {}
    )

    if (includeUserAdded) {
      return (
        userAddedTokens
          // reduce into all ALL_TOKENS filtered by the current chain
          .reduce<{ [address: string]: Token }>(
            (tokenMap, token) => {
              tokenMap[token.address] = token
              return tokenMap
            },
            // must make a copy because reduce modifies the map, and we do not
            // want to make a copy in every iteration
            { ...mapWithoutUrls }
          )
      )
    }

    return mapWithoutUrls
  }, [chainId, userAddedTokens, tokenMap, includeUserAdded])
}

export function useAllTokens(): { [address: string]: Token } {
  const allTokens = useCombinedActiveList()
  return useTokensFromMap(allTokens, true)
}

export function useUnsupportedTokens(): { [address: string]: Token } {
  const unsupportedTokensMap = useUnsupportedTokenList()
  return useTokensFromMap(unsupportedTokensMap, false)
}

export function useSearchInactiveTokenLists(search: string | undefined, minResults = 10): WrappedTokenInfo[] {
  const lists = useAllLists()
  const inactiveUrls = useInactiveListUrls()
  const { chainId } = useActiveWeb3React()
  const activeTokens = useAllTokens()
  return useMemo(() => {
    if (!search || search.trim().length === 0) return []
    const tokenFilter = createTokenFilterFunction(search)
    const result: WrappedTokenInfo[] = []
    const addressSet: { [address: string]: true } = {}
    for (const url of inactiveUrls) {
      const list = lists[url].current
      if (!list) continue
      for (const tokenInfo of list.tokens) {
        if (tokenInfo.chainId === chainId && tokenFilter(tokenInfo)) {
          const wrapped = new WrappedTokenInfo(tokenInfo, list)
          if (!(wrapped.address in activeTokens) && !addressSet[wrapped.address]) {
            addressSet[wrapped.address] = true
            result.push(wrapped)
            if (result.length >= minResults) return result
          }
        }
      }
    }
    return result
  }, [activeTokens, chainId, inactiveUrls, lists, minResults, search])
}

export function useIsTokenActive(token: Token | undefined | null): boolean {
  const activeTokens = useAllTokens()

  if (!activeTokens || !token) {
    return false
  }

  return !!activeTokens[token.address]
}

// Check if currency is included in custom list from user storage
export function useIsUserAddedToken(currency: Currency | undefined | null): boolean {
  const userAddedTokens = useUserAddedTokens()

  if (!currency) {
    return false
  }

  return !!userAddedTokens.find((token) => currency.equals(token))
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
    ? parseBytes32String(bytes32)
    : defaultValue
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string, tokenAlt?: any): Token | undefined | null {
  const { chainId, library, account } = useActiveWeb3React()
  const [tokenName, setTokenName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [decimals, setDecimals] = useState(0)
  const tokens = useAllTokens()

  const address = isAddress(tokenAddress)

  const token: Token | undefined = address ? tokens[address] : undefined

  useEffect(() => {
    if (address && library && account) {
      const tokenInst = getContract(address, ERC20_ABI, library, account)
      ;(async () => {
        try {
          setTokenName(await tokenInst.name())
          setSymbol(await tokenInst.symbol())
          setDecimals(await tokenInst.decimals())
        } catch (e) {
          console.log(e)
        }
      })()
    }
  }, [address, library, account])

  return useMemo(() => {
    if (token) return token
    if (tokenAlt) {
      return new Token(3, tokenAlt?.id, 18, tokenAlt?.symbol, tokenAlt?.name) // FIXME!!!
    }
    if (!chainId || !address) return undefined
    if (decimals) {
      return new Token(
        chainId,
        address,
        decimals,
        parseStringOrBytes32(symbol, '', 'UNKNOWN'),
        parseStringOrBytes32(tokenName, '', 'Unknown Token')
      )
    }
    return undefined
  }, [address, chainId, decimals, symbol, tokenName, token, tokenAlt])
}

export function useCurrency(currencyId: string | undefined, tokenAlt?: any): Currency | null | undefined {
  const { chainId } = useActiveWeb3React()
  const isETH = currencyId?.toUpperCase() === 'ETH' || currencyId === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' // FIXME
  const token = useToken(isETH ? undefined : currencyId, tokenAlt)
  const weth = chainId ? WETH9_EXTENDED[chainId] : undefined
  if (weth?.address?.toLowerCase() === currencyId?.toLowerCase()) return weth

  return isETH ? (chainId ? ExtendedEther.onChain(chainId) : undefined) : token
}
