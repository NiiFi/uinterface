import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { t } from '@lingui/macro'
import SimpleChart from './SimpleChart'

const DepositApr = ({ data }: { data: any }) => {
  const theme = useContext(ThemeContext)

  return (
    <SimpleChart
      title={t`Deposit APR`}
      data={data}
      loader={false}
      timeFormat={'MMM D'}
      dataKey="depositAPR"
      color={theme.green2}
      height={250}
    />
  )
}

export default DepositApr
