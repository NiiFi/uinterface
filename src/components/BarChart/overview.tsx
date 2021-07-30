import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { TYPE, BaseCurrencyView } from '../../theme'
import { shortenDecimalValues } from '../../utils'
import BarChart from './index'
import dummyData from './data'

dayjs.extend(utc)

const OverviewChart = () => {
  const theme = useContext(ThemeContext)
  const [amount, setAmount] = useState<number | undefined>()
  const [time, setTime] = useState<string | undefined>()

  useEffect(() => {
    if (!time && dummyData) {
      setTime(dayjs(dummyData[dummyData.length - 1].time).format('MMM D, YYYY'))
    }
  }, [time])

  useEffect(() => {
    if (!amount && dummyData) {
      setAmount(dummyData[dummyData.length - 1].value)
    }
  }, [amount])

  return (
    <>
      <TYPE.subHeader fontSize="16px" style={{ margin: '12px 0 6px 0' }}>
        <Trans>Volume 24H</Trans>
      </TYPE.subHeader>
      <TYPE.mediumHeader>
        <BaseCurrencyView type="symbol" value={shortenDecimalValues(String(amount), '0.[00]a')} />
      </TYPE.mediumHeader>
      <TYPE.body color={theme.text6} fontWeight={400} fontSize={14} lineHeight={1.4}>
        {time || '-'}
      </TYPE.body>
      <BarChart
        data={dummyData}
        color={theme.green2}
        value={amount}
        setValue={setAmount}
        label={time}
        setLabel={setTime}
        style={{ padding: 0, marginTop: '30px' }}
      />
    </>
  )
}

export default OverviewChart
