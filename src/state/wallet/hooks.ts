import { Currency, Token, CurrencyAmount, Ether } from '@uniswap/sdk-core'
import JSBI from 'jsbi'
import { useState, useEffect, useMemo } from 'react'
import { useActiveWeb3React } from '../../hooks/web3'
import { useAllTokens } from '../../hooks/Tokens'
import { isAddress } from '../../utils'
import { useAppSelector } from 'state/hooks'
import { balanceKey } from 'state/wallet/reducer'
/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useETHBalances(uncheckedAddresses?: (string | undefined)[]): {
  [address: string]: CurrencyAmount<Currency> | undefined
} {
  const [results, setResults] = <any[]>useState()
  const { chainId } = useActiveWeb3React()

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses]
  )

  const { account, library } = useActiveWeb3React()

  useEffect((): any => {
    if (!!account && !!library) {
      library
        .getBalance(account)
        .then((balance: any) => {
          setResults(balance)
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }, [account, library, setResults])

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: CurrencyAmount<Currency> }>((memo, address) => {
        if (results && chainId)
          memo[address] = CurrencyAmount.fromRawAmount(Ether.onChain(chainId), JSBI.BigInt(results.toString()))
        return memo
      }, {}),
    [addresses, chainId, results]
  )
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[]
): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] {
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false) ?? [],
    [tokens]
  )

  const { chainId } = useActiveWeb3React()

  const balances = useAppSelector((state: any) => state.wallet.balances)

  return [
    useMemo(
      () =>
        address && balances && chainId && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }>((memo, token) => {
              const balance = balances?.[balanceKey({ chainId, address, tokenAddress: token.address })]
              const amount = balance ? JSBI.BigInt(balance.value.toString()) : 0
              memo[token.address] = CurrencyAmount.fromRawAmount(token, amount || 0)
              return memo
            }, {})
          : {},
      [address, validatedTokens, balances, chainId]
    ),
    false,
  ]
}

export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[]
): { [tokenAddress: string]: CurrencyAmount<Token> | undefined } {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0]
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): CurrencyAmount<Token> | undefined {
  const tokenBalances = useTokenBalances(account, [token])
  if (!token) return undefined
  return tokenBalances[token.address]
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[]
): (CurrencyAmount<Currency> | undefined)[] {
  const tokens = useMemo(
    () => currencies?.filter((currency): currency is Token => currency?.isToken ?? false) ?? [],
    [currencies]
  )

  const tokenBalances = useTokenBalances(account, tokens)
  const containsETH: boolean = useMemo(() => currencies?.some((currency) => currency?.isNative) ?? false, [currencies])
  const ethBalance = useETHBalances(containsETH ? [account] : [])

  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!account || !currency) return undefined
        if (currency.isToken) return tokenBalances[currency.address]
        if (currency.isNative) return ethBalance[account]
        return undefined
      }) ?? [],
    [account, currencies, ethBalance, tokenBalances]
  )
}

export function useCurrencyBalance(account?: string, currency?: Currency): CurrencyAmount<Currency> | undefined {
  return useCurrencyBalances(account, [currency])[0]
}

// mimics useAllBalances
export function useAllTokenBalances(): { [tokenAddress: string]: CurrencyAmount<Token> | undefined } {
  const { account } = useActiveWeb3React()
  const allTokens = useAllTokens()
  const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens])
  const balances = useTokenBalances(account ?? undefined, allTokensArray)
  return balances ?? {}
}
