import React, { useState, useContext, useEffect } from 'react'
import { ThemeContext } from 'styled-components'
import { Trans } from '@lingui/macro'
import { TYPE } from '../../theme'
import { shortenDecimalValues } from '../../utils'
import BarChart from './index'
import dummyData from './data'

const OverviewChart = () => {
  const theme = useContext(ThemeContext)
  const [amount, setAmount] = useState<number | undefined>()
  const [time, setTime] = useState<string | undefined>()

  useEffect(() => {
    if (!time && dummyData) {
      setTime(dummyData[dummyData.length - 1].time)
    }
  }, [time])

  useEffect(() => {
    if (!amount && dummyData) {
      setAmount(dummyData[dummyData.length - 1].value)
    }
  }, [amount])

  return (
    <>
      <TYPE.subHeader fontSize="16px">
        <Trans>Volume 24H</Trans>
      </TYPE.subHeader>
      <TYPE.mediumHeader>{shortenDecimalValues(String(amount))}</TYPE.mediumHeader>
      <TYPE.body color={theme.text4} fontWeight={400} fontSize={14}>
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
