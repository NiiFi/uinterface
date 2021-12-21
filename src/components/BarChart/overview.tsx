import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { TYPE, BaseCurrencyView } from '../../theme'
import BarChart from './index'
import { useApiStatsLocalTvl } from 'hooks/useApi'

dayjs.extend(utc)

const OverviewChart = () => {
  const theme = useContext(ThemeContext)
  const [amount, setAmount] = useState<number | undefined>()
  const [time, setTime] = useState<string | undefined>()

  const { data, loader, abortController } = useApiStatsLocalTvl()

  useEffect(() => {
    if (!data || !data.length) return
    data
      .sort((a: any, b: any) => {
        return new Date(a.time).getTime() - new Date(b.time).getTime()
      })
      .map((item: any) => {
        item.volume = Number(item.volume)
        return item
      })
  }, [data])

  useEffect(() => {
    if (!time && data && data.length) {
      setTime(dayjs(data[data.length - 1].time).format('MMM D, YYYY'))
    }
  }, [time, data])

  useEffect(() => {
    if (!amount && data && data.length) {
      setAmount(data[data.length - 1].volume)
    }
  }, [amount, data])

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <TYPE.subHeader fontSize="16px" style={{ margin: '12px 0 6px 0' }}>
        <Trans>Volume History 24H</Trans>
      </TYPE.subHeader>
      <TYPE.mediumHeader>
        {(amount && !isNaN(amount) && <BaseCurrencyView type="symbol" value={amount} />) || '-'}
      </TYPE.mediumHeader>
      <TYPE.body color={theme.text6} fontWeight={400} fontSize={14} lineHeight={1.4}>
        {time || '-'}
      </TYPE.body>
      {loader ||
        (data && (
          <BarChart
            data={data}
            color={theme.green2}
            value={amount}
            setValue={setAmount}
            valueName={'volume'}
            label={time}
            setLabel={setTime}
            style={{ padding: 0, marginTop: '30px' }}
          />
        ))}
    </>
  )
}

export default OverviewChart
