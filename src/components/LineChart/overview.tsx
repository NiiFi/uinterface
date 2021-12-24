import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { TYPE, BaseCurrencyView } from '../../theme'
import LineChart from './index'
import { useApiStatsLocalTvl } from 'hooks/useApi'

dayjs.extend(utc)

const OverviewChart = () => {
  const theme = useContext(ThemeContext)
  const [amount, setAmount] = useState<number | undefined>()
  const [time, setTime] = useState<string | undefined>()

  const {
    data: lineChartData,
    loader: lineChartLoader,
    abortController: lineChartAbortController,
  } = useApiStatsLocalTvl()

  useEffect(() => {
    if (!lineChartData || !lineChartData.length) return
    lineChartData
      .sort((a: any, b: any) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime()
      })
      .map((item: any) => {
        item.tvl = Number(item.tvl)
        return item
      })
  }, [lineChartData])

  useEffect(() => {
    if (!time && lineChartData && lineChartData.length) {
      setTime(dayjs(lineChartData[lineChartData.length - 1].time).format('MMM D, YYYY'))
    }
  }, [time, lineChartData])

  useEffect(() => {
    if (!amount && lineChartData && lineChartData.length) {
      setAmount(lineChartData[lineChartData.length - 1].tvl)
    }
  }, [amount, lineChartData])

  useEffect(() => {
    return () => {
      lineChartAbortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <TYPE.subHeader fontSize="16px" style={{ margin: '12px 0 6px 0' }}>
        <Trans>TVL History</Trans>
      </TYPE.subHeader>
      <TYPE.mediumHeader>
        {(amount && !isNaN(amount) && <BaseCurrencyView type="symbol" value={amount} />) || '-'}
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
            currentValue="tvl"
            value1Name={'tvl'}
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
