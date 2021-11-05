import { computePairAddress, Pair } from '@niifi/godzilla2-sdk'
import { useMemo, useState, useEffect } from 'react'
import { FACTORY_ADDRESSES } from '../constants/addresses'
import { Currency, CurrencyAmount /*, Token*/ } from '@uniswap/sdk-core'
import { usePairContract } from 'hooks/useContract'

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

export function usePairs(
  currencies: [Currency | null | undefined, Currency | null | undefined][]
): [PairState, Pair | null][] {
  const tokens = useMemo(
    () => currencies.map(([currencyA, currencyB]) => [currencyA?.wrapped, currencyB?.wrapped]),
    [currencies]
  )
  const [reserves, setReserves] = <any[]>useState([])

  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        return tokenA &&
          tokenB &&
          tokenA.chainId === tokenB.chainId &&
          !tokenA.equals(tokenB) &&
          FACTORY_ADDRESSES[tokenA.chainId]
          ? computePairAddress({ factoryAddress: FACTORY_ADDRESSES[tokenA.chainId], tokenA, tokenB })
          : undefined
      }),
    [tokens]
  )

  const contract = usePairContract(pairAddresses[0], false)

  useEffect(() => {
    if (!contract) {
      return
    }

    contract
      .getReserves()
      .then(({ reserve0, reserve1 }: { reserve0: string; reserve1: any }) => {
        setReserves([[reserve0, reserve1]])
      })
      .catch(() => {
        return null
      })
  }, [contract, tokens, setReserves])

  return useMemo(() => {
    if (!reserves.length || !tokens.length) {
      return [[PairState.NOT_EXISTS, null]]
    }
    return reserves.map((reserve: any, i: number) => {
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      return [
        PairState.EXISTS,
        new Pair(
          CurrencyAmount.fromRawAmount(token0, reserve[0].toString()),
          CurrencyAmount.fromRawAmount(token1, reserve[1].toString())
        ),
      ]
    })
  }, [reserves, tokens])
}

export function usePair(tokenA?: Currency | null, tokenB?: Currency | null): [PairState, Pair | null] {
  const inputs: [[Currency | null | undefined, Currency | null | undefined]] = useMemo(
    () => [[tokenA, tokenB]],
    [tokenA, tokenB]
  )
  return usePairs(inputs)[0]
}
