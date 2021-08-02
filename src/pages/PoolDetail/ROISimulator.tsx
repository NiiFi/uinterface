import React, { useState, useCallback } from 'react'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'

import { RowBetween } from 'components/Row'
import { TYPE, BaseCurrencyView } from 'theme'
import { useFakePoolValuesCalculator } from 'state/pool/hooks'
import { PoolInvestPairValues } from 'state/pool/actions'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import ROIPeriodDropdown from 'components/Dropdowns/ROIPeriodDropdown'
import TokenPairInputPanel from 'components/pools/TokenPairInputPanel'

const PeriodWrapper = styled(RowBetween)`
  padding 0.75rem 0px;
  border-top: 1px solid ${({ theme }) => theme.bg3};
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
`

export default function ROISimulator({ token0, token1 }: { token0: string; token1: string }) {
  const [pairValues, setPairValues] = useState<PoolInvestPairValues | null>(null)
  const [investmentValue, setInvestmentValue] = useState('')
  const [roiValues, setROIValues] = useState<{ token0: string; token1: string; roiInUSD: string }>({
    token0: '',
    token1: '',
    roiInUSD: '',
  })
  const [roiPeriod, setROIPeriod] = useState('oneMonth')
  const { calculateTotalInvestmentInUSD, calculateEstimatedROI } = useFakePoolValuesCalculator()

  const updateUIValues = useCallback(
    (tokenValues: PoolInvestPairValues, period: string) => {
      setInvestmentValue(calculateTotalInvestmentInUSD(tokenValues))
      setROIValues(calculateEstimatedROI(tokenValues, period))
    },
    [setInvestmentValue, calculateTotalInvestmentInUSD, setROIValues, calculateEstimatedROI]
  )
  const handlePairOnChange = useCallback(
    (tokenValues: PoolInvestPairValues) => {
      setPairValues(tokenValues)
      updateUIValues(tokenValues, roiPeriod)
    },
    [setPairValues, updateUIValues, roiPeriod]
  )
  const handleROIPeriodChange = useCallback(
    (value: string) => {
      setROIPeriod(value)
      if (pairValues) {
        updateUIValues(pairValues, value)
      }
    },
    [setROIPeriod, pairValues, updateUIValues]
  )
  return (
    <>
      <TYPE.subHeader color="text6" marginBottom={'0.75rem'}>
        <Trans>Amount to Invest</Trans>
      </TYPE.subHeader>
      <TokenPairInputPanel
        onChange={handlePairOnChange}
        token0={{ symbol: 'ETH', address: '12345' }}
        token1={{ symbol: 'NII', address: '12345' }}
      />
      <TYPE.subHeader color="text6" textAlign="right" marginBottom="1rem">
        {'≈ '}
        <BaseCurrencyView
          type="id"
          numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT}
          value={investmentValue ? Number(investmentValue) : 0}
        />
      </TYPE.subHeader>
      <PeriodWrapper>
        <TYPE.body>
          <Trans>Period</Trans>
        </TYPE.body>
        <ROIPeriodDropdown selectedItem={roiPeriod} onItemSelect={handleROIPeriodChange} />
      </PeriodWrapper>
      <RowBetween marginTop="1rem" marginBottom="0.5rem" style={{ alignItems: 'flex-start' }}>
        <TYPE.body>
          <Trans>Est. ROI</Trans>
        </TYPE.body>
        <TYPE.mediumHeader color="text1" textAlign="right">
          {`≈ ${roiValues.token0 ? Number(roiValues.token0).toFixed(2) : '0'} ${token0}`}
          <br />
          {`≈ ${roiValues.token1 ? Number(roiValues.token1).toFixed(2) : '0'} ${token1}`}
        </TYPE.mediumHeader>
      </RowBetween>
      <TYPE.subHeader color="text6" textAlign="right">
        {'≈ '}
        <BaseCurrencyView
          type="id"
          numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT}
          value={roiValues.roiInUSD ? Number(roiValues.roiInUSD) : 0}
        />
      </TYPE.subHeader>
    </>
  )
}
