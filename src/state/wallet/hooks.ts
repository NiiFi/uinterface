import { Currency, Token, CurrencyAmount, Ether } from '@uniswap/sdk-core'
import JSBI from 'jsbi'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useActiveWeb3React } from '../../hooks/web3'
import { useAllTokens } from '../../hooks/Tokens'
import { isAddress } from '../../utils'
import { useAppSelector } from 'state/hooks'
import { balanceKey } from 'state/wallet/reducer'
import {
  TokenBalanceListenerKey,
  startListeningForBalance,
  stopListeningForBalance,
  startListeningForTokenBalances,
  stopListeningForTokenBalances,
} from 'state/wallet/actions'
import { AppDispatch } from '../index'
/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useETHBalances(uncheckedAddresses?: (string | undefined)[]): {
  [address: string]: CurrencyAmount<Currency> | undefined
} {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()

  const balances = useAppSelector((state: any) => state.wallet.balances)

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

  // used so that we do a deep comparison in `useEffect`
  const serializedAddresses = JSON.stringify(addresses)

  // add the listeners on mount, remove them on dismount
  useEffect(() => {
    const addresses = JSON.parse(serializedAddresses)
    if (addresses.length === 0) return

    dispatch(startListeningForBalance({ addresses }))
    return () => {
      dispatch(stopListeningForBalance({ addresses }))
    }
  }, [serializedAddresses, dispatch])

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: CurrencyAmount<Currency> }>((memo, address) => {
        if (balances && chainId) {
          const key = balanceKey({ address, chainId })
          const { value } = balances[key] ?? {}
          if (value) {
            memo[address] = CurrencyAmount.fromRawAmount(Ether.onChain(chainId), JSBI.BigInt(value))
          }
        }
        return memo
      }, {}),
    [addresses, chainId, balances]
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
  // console.log('BALANCES', balances)
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
  const dispatch = useDispatch<AppDispatch>()
  const tokens = useMemo(
    () => currencies?.filter((currency): currency is Token => currency?.isToken ?? false) ?? [],
    [currencies]
  )

  // used so that we do a deep comparison in `useEffect`
  const serializedCombos: string = useMemo(() => {
    return JSON.stringify(
      !account || tokens.length === 0
        ? []
        : tokens
            .map((t: Token) => t.address)
            .sort()
            .map((tokenAddress: string) => ({ address: account, tokenAddress }))
    )
  }, [account, tokens])

  // keep the listeners up to date
  useEffect(() => {
    const combos: TokenBalanceListenerKey[] = JSON.parse(serializedCombos)
    if (combos.length === 0) return

    dispatch(startListeningForTokenBalances(combos))
    return () => {
      dispatch(stopListeningForTokenBalances(combos))
    }
  }, [account, serializedCombos, dispatch])

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
