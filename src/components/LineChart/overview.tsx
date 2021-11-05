import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { TYPE, BaseCurrencyView } from '../../theme'
import LineChart from './index'
// import { useApiStatsLocalTvl } from 'hooks/useApi'

dayjs.extend(utc)

const OverviewChart = () => {
  const theme = useContext(ThemeContext)
  const [amount, setAmount] = useState<number | undefined>()
  const [time, setTime] = useState<string | undefined>()

  // const { data: lineChartData, loader: lineChartLoader } = useApiStatsLocalTvl()
  const lineChartData: any = []
  const lineChartLoader = false

  useEffect(() => {
    if (!time && lineChartData && lineChartData.length) {
      setTime(dayjs(lineChartData[lineChartData.length - 1].time).format('MMM D, YYYY'))
    }
  }, [time, lineChartData])

  useEffect(() => {
    if (!amount && lineChartData && lineChartData.length) {
      setAmount(lineChartData[lineChartData.length - 1].liquidity)
    }
  }, [amount, lineChartData])

  return (
    <>
      <TYPE.subHeader fontSize="16px" style={{ margin: '12px 0 6px 0' }}>
        <Trans>TVL</Trans>
      </TYPE.subHeader>
      <TYPE.mediumHeader>
        {(amount && !isNaN(amount) && <BaseCurrencyView type="symbol" value={amount} numeralFormat={'0.[00]a'} />) ||
          '-'}
      </TYPE.mediumHeader>
      <TYPE.body color={theme.text6} fontWeight={400} fontSize={14} lineHeight={1.4}>
        {time || '-'}
      </TYPE.body>
      {lineChartLoader ||
        (lineChartData && (
          <LineChart
            data={lineChartData}
            minHeight={165}
            color={theme.orange1}
            value1={amount}
            setValue1={setAmount}
            currentValue="liquidity"
            value1Name={'liquidity'}
            dateFormat="DD"
            label={time}
            setLabel={setTime}
            YAxisTick={false}
            style={{ flexDirection: 'column' }}
          />
        ))}
    </>
  )
}

export default OverviewChart
