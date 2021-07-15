import React, { useState } from 'react'
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
  const getChangeHandler = (active: 'token0' | 'token1') => (value: string) => {
    if (!value) {
      setToken0Value('')
      setToken1Value('')
      onChange && onChange({ token0: { ...token0, value: '' }, token1: { ...token1, value: '' } })
      return
    }
    const token0NextValue = active === 'token0' ? value : getValueEquivalentTo(token1, value, token0)
    const token1NextValue = active === 'token1' ? value : getValueEquivalentTo(token0, value, token1)
    setToken0Value(token0NextValue)
    setToken1Value(token1NextValue)
    onChange &&
      onChange({ token0: { ...token0, value: token0NextValue }, token1: { ...token1, value: token1NextValue } })
  }

  return (
    <>
      <RowBetween marginBottom="1rem">
        <CurrencyAvatar symbol={token0.symbol} containerStyle={{ padding: '0.3125rem' }} />
        <NumericalInput
          style={{ maxWidth: '50%' }}
          fontSize="1.25rem"
          value={token0Value}
          onUserInput={getChangeHandler('token0')}
        />
      </RowBetween>
      <RowBetween>
        <CurrencyAvatar symbol={token1.symbol} />
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
