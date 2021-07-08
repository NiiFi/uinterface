import React, { useState, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { TYPE } from '../../theme'
import { Trans } from '@lingui/macro'
import BarChart from './index'
import dummyData from './data'

const OverviewChart = () => {
  const theme = useContext(ThemeContext)
  const [amount, setAmount] = useState<number | undefined>()
  const [time, setTime] = useState<string | undefined>()

  return (
    <>
      <TYPE.largeHeader fontSize="16px">
        <Trans>Volume 24H</Trans>
      </TYPE.largeHeader>
      <>{amount}</>
      <>{time}</>
      <BarChart
        data={dummyData}
        color={theme.green2}
        value={amount}
        setValue={setAmount}
        label={time}
        setLabel={setTime}
      />
    </>
  )
}

export default OverviewChart
