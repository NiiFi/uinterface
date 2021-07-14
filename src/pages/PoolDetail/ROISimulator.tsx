import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'

import { RowBetween } from 'components/Row'
import { TYPE } from 'theme'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { MainCurrency } from 'utils'
import ROIPeriodDropdown from 'components/Dropdowns/ROIPeriodDropdown'

const PeriodWrapper = styled(RowBetween)`
  padding 0.75rem 0px;
  border-top: 1px solid ${({ theme }) => theme.bg3};
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
`
export default function ROISimulator({ token0, token1 }: { token0: string; token1: string }) {
  const [roiPeriod, setROIPeriod] = useState('oneMonth')
  return (
    <>
      <TYPE.subHeader color="text6" marginBottom={'0.75rem'}>
        <Trans>Amount to Invest</Trans>
      </TYPE.subHeader>
      <RowBetween marginBottom="1rem">
        <CurrencyAvatar symbol={'ETH'} containerStyle={{ padding: '0.3125rem' }} />
        <TYPE.mediumHeader color="text1">
          <Trans>14</Trans>
        </TYPE.mediumHeader>
      </RowBetween>
      <RowBetween marginBottom="0.4375rem">
        <CurrencyAvatar symbol={'NII'} />
        <TYPE.mediumHeader color="text1">
          <Trans>148</Trans>
        </TYPE.mediumHeader>
      </RowBetween>
      <TYPE.subHeader color="text6" textAlign="right" marginBottom="1rem">
        <Trans>≈ 9,394.85</Trans>
        {` ${MainCurrency}`}
      </TYPE.subHeader>
      <PeriodWrapper>
        <TYPE.body>
          <Trans>Period</Trans>
        </TYPE.body>
        <ROIPeriodDropdown selectedItem={roiPeriod} onItemSelect={setROIPeriod} />
      </PeriodWrapper>
      <RowBetween marginTop="1rem" marginBottom="0.5rem" style={{ alignItems: 'flex-start' }}>
        <TYPE.body>
          <Trans>Est. ROI</Trans>
        </TYPE.body>
        <TYPE.mediumHeader color="text1" textAlign="right">
          <Trans>≈ 0.08</Trans>
          {` ${token0}`}
          <br />
          <Trans>≈ 1.53</Trans>
          {` ${token1}`}
        </TYPE.mediumHeader>
      </RowBetween>
      <TYPE.subHeader color="text6" textAlign="right">
        <Trans>≈ 145</Trans>
        {` ${MainCurrency}`}
      </TYPE.subHeader>
    </>
  )
}
