import React, { useState, useCallback } from 'react'
import { PoolInvestPair, PoolInvestPairValues } from 'state/pool/actions'
import NumericalInput from 'components/NumericalInput'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { RowBetween } from 'components/Row'
import { useFakePoolValuesCalculator } from 'state/pool/hooks'

export type TokenPairInputPanelProps = PoolInvestPair & {
  onChange?: (values: PoolInvestPairValues) => void
  hasError?: boolean
}

export default function TokenPairInputPanel({ token0, token1, onChange }: TokenPairInputPanelProps) {
  const { getValueEquivalentTo } = useFakePoolValuesCalculator()
  const [token0Value, setToken0Value] = useState('')
  const [token1Value, setToken1Value] = useState('')
  const handleToken0OnBlur = useCallback(() => {
    if (token0Value) {
      const token1NextValue = getValueEquivalentTo(token0, token0Value, token1)
      setToken1Value(token1NextValue)
      onChange &&
        onChange({
          token0: {
            ...token0,
            value: token0Value,
          },
          token1: {
            ...token1,
            value: token1NextValue,
          },
        })
    }
  }, [token0Value, token0, token1, setToken1Value, onChange, getValueEquivalentTo])

  const handleToken1OnBlur = useCallback(() => {
    if (token1Value) {
      const token0NextValue = getValueEquivalentTo(token1, token1Value, token0)
      setToken0Value(token0NextValue)
      onChange &&
        onChange({
          token0: {
            ...token0,
            value: token0NextValue,
          },
          token1: {
            ...token1,
            value: token1Value,
          },
        })
    }
  }, [token1Value, token0, token1, setToken0Value, onChange, getValueEquivalentTo])
  return (
    <>
      <RowBetween marginBottom="1rem">
        <CurrencyAvatar symbol={token0.symbol} containerStyle={{ padding: '0.3125rem' }} />
        <NumericalInput
          style={{ maxWidth: '50%' }}
          onBlur={handleToken0OnBlur}
          fontSize="1.25rem"
          value={token0Value}
          onUserInput={setToken0Value}
        />
      </RowBetween>
      <RowBetween>
        <CurrencyAvatar symbol={token1.symbol} />
        <NumericalInput
          style={{ maxWidth: '50%' }}
          onBlur={handleToken1OnBlur}
          fontSize="1.25rem"
          value={token1Value}
          onUserInput={setToken1Value}
        />
      </RowBetween>
    </>
  )
}
