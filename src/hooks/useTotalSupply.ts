import { useState, useEffect } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { Token, CurrencyAmount, Currency } from '@uniswap/sdk-core'
import { useTokenContract } from './useContract'
import { useBlockNumber } from '../state/application/hooks'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useTotalSupply(token?: Currency): CurrencyAmount<Token> | undefined {
  const contract = useTokenContract(token?.isToken ? token.address : undefined, false)
  const [totalSupply, setTotalSupply] = useState<string | undefined>()

  const latestBlockNumber = useBlockNumber()

  useEffect(() => {
    if (!latestBlockNumber || !contract) {
      return
    }
    contract.totalSupply().then((totalSupply: BigNumber) => setTotalSupply(totalSupply.toString()))
  }, [latestBlockNumber, contract])

  return token?.isToken && totalSupply ? CurrencyAmount.fromRawAmount(token, totalSupply) : undefined
}
