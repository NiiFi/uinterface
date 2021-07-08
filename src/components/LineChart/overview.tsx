import React, { useState, useContext, useMemo, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import { Trans } from '@lingui/macro'
import { TYPE } from '../../theme'
import { shortenDecimalValues } from '../../utils'
import LineChart from './index'
import getLineChartData from './data'

const OverviewChart = () => {
  const theme = useContext(ThemeContext)
  const [amount, setAmount] = useState<number | undefined>()
  const [time, setTime] = useState<string | undefined>()

  const lineChartData = useMemo(() => {
    return getLineChartData('all')
  }, [])

  useEffect(() => {
    if (!time && lineChartData) {
      setTime(lineChartData[lineChartData.length - 1].time)
    }
  }, [time])

  useEffect(() => {
    if (!amount && lineChartData) {
      setAmount(lineChartData[lineChartData.length - 1].value1)
    }
  }, [amount])

  return (
    <>
      <TYPE.subHeader fontSize="16px">
        <Trans>TVL</Trans>
      </TYPE.subHeader>
      <TYPE.mediumHeader>{shortenDecimalValues(String(amount))}</TYPE.mediumHeader>
      <TYPE.body color={theme.text4} fontWeight={400} fontSize={14}>
        {time || '-'}
      </TYPE.body>
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
        YAxisTick={false}
        style={{ flexDirection: 'column' }}
      />
    </>
  )
}

export default OverviewChart
