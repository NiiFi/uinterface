import React from 'react'
import { t } from '@lingui/macro'
import SimpleChart from './SimpleChart'
import { useApiPoolStatsGeneral } from 'hooks/useApi'

const UtilisationRate = ({ address }: { address: string }) => {
  const { data, loader } = useApiPoolStatsGeneral('all')

  console.log(address)

  return <SimpleChart title={t`Utilisation rate`} data={data} loader={loader} dataKey="volume" height={250} />
}

export default UtilisationRate
