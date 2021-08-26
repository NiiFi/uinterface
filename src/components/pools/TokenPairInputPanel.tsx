import React, { useState, useEffect } from 'react'
import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import { PoolInvestPairValues } from 'state/pool/actions'
import NumericalInput from 'components/NumericalInput'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { RowBetween } from 'components/Row'
import { tryParseAmount } from 'state/swap/hooks'
import { TokenName, PoolToken } from 'state/pool/actions'
import { usePair } from 'hooks/usePairs'

export type TokenPairInputPanelProps = {
  currency0: Currency
  currency1: Currency
  value0?: string
  value1?: string
  onChange?: (values: PoolInvestPairValues, active?: string) => void
  hasError?: boolean
}

export default function TokenPairInputPanel({
  currency0,
  currency1,
  value0,
  value1,
  onChange,
}: TokenPairInputPanelProps) {
  const token0: PoolToken = {
    symbol: currency0.symbol as TokenName,
    address: currency0.isNative ? '' : currency0.address,
  }
  const token1: PoolToken = {
    symbol: currency1.symbol as TokenName,
    address: currency1.isNative ? '' : currency1.address,
  }

  const [tokenA, tokenB] = [currency0?.wrapped, currency1?.wrapped]
  const [token0Value, setToken0Value] = useState('')
  const [token1Value, setToken1Value] = useState('')
  const [, pair] = usePair(currency0, currency1)

  const getChangeHandler = (active: 'token0' | 'token1') => (value: string) => {
    if (!(value && pair && currency0 && currency1 && tokenA && tokenB)) {
      setToken0Value('')
      setToken1Value('')
      onChange && onChange({ token0: { ...token0, value: '' }, token1: { ...token1, value: '' } })
      return
    }

    const isActiveToken0 = active === 'token0'
    const activeCurrency = isActiveToken0 ? currency0 : currency1
    const valueParsed: CurrencyAmount<Currency> | undefined = tryParseAmount(value, activeCurrency)
    let valueCalculated = ''

    valueParsed &&
      (valueCalculated = pair
        .priceOf(isActiveToken0 ? tokenA : tokenB)
        .quote(valueParsed?.wrapped)
        .toExact())

    const value0 = isActiveToken0 ? value : valueCalculated
    const value1 = !isActiveToken0 ? value : valueCalculated
    setToken0Value(value0)
    setToken1Value(value1)
    onChange &&
      onChange(
        {
          token0: { ...token0, value: value0 },
          token1: { ...token1, value: value1 },
        },
        active
      )
  }

  useEffect(() => {
    if (!value0 || !value1) {
      return
    }
    setToken0Value(value0)
    setToken1Value(value1)
  }, [value0, value1])

  return (
    <>
      <RowBetween marginBottom="1rem">
        <CurrencyAvatar symbol={token0.symbol} address={token0.address} iconProps={{ width: '30', height: '30' }} />
        <NumericalInput
          style={{ maxWidth: '50%' }}
          fontSize="1.25rem"
          value={token0Value}
          onUserInput={getChangeHandler('token0')}
        />
      </RowBetween>
      <RowBetween>
        <CurrencyAvatar symbol={token1.symbol} address={token1.address} iconProps={{ width: '30', height: '30' }} />
        <NumericalInput
          style={{ maxWidth: '50%' }}
          fontSize="1.25rem"
          value={token1Value}
          onUserInput={getChangeHandler('token1')}
        />
      </RowBetween>
    </>
  )
}
