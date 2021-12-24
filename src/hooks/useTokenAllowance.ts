import { Token, CurrencyAmount } from '@niifi/godzilla2-sdk'
import { useMemo, useState } from 'react'
import { useTokenContract } from './useContract'

export function useTokenAllowance(token?: Token, owner?: string, spender?: string): CurrencyAmount<Token> | undefined {
  const [allowance, setAllowance] = useState('')
  const contract = useTokenContract(token?.address, false)

  if (contract && owner && spender) {
    contract.allowance(owner, spender).then((balance) => setAllowance(balance.toString()))
  }

  return useMemo(
    () => (token && allowance ? CurrencyAmount.fromRawAmount(token, allowance) : undefined),
    [token, allowance]
  )
}
