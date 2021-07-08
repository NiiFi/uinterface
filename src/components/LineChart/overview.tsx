import React, { useState, useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { Trans } from '@lingui/macro'
import { TYPE } from '../../theme'
import LineChart from './index'
import getLineChartData from './data'

const OverviewChart = () => {
  const theme = useContext(ThemeContext)
  const [amount, setAmount] = useState<number | undefined>()
  const [time, setTime] = useState<string | undefined>()

  const lineChartData = useMemo(() => {
    return getLineChartData('all')
  }, [])

  return (
    <>
      <TYPE.largeHeader fontSize="16px">
        <Trans>TVL</Trans>
      </TYPE.largeHeader>
      <>{amount}</>
      <>{time}</>
      <LineChart
        data={lineChartData}
        minHeight={165}
        color={theme.orange1}
        value1={amount}
        setValue1={setAmount}
        currentValue="value1"
        dateFormat="DD"
        label={time}
        setLabel={setTime}
        style={{ flexDirection: 'column' }}
      />
    </>
  )
}

export default OverviewChart
