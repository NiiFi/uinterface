import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { t } from '@lingui/macro'
import SimpleChart from './SimpleChart'
import { useApiPoolStatsGeneral } from 'hooks/useApi'

const DepositApr = ({ address }: { address: string }) => {
  const theme = useContext(ThemeContext)
  const { data, loader } = useApiPoolStatsGeneral('all')

  console.log(address)

  return (
    <SimpleChart
      title={t`Deposit APR`}
      data={data}
      loader={loader}
      dataKey="liquidity"
      color={theme.green2}
      height={250}
    />
  )
}

export default DepositApr
