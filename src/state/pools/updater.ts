import { useUpdatePoolData, useAllPoolData } from './hooks'
import { useEffect, useMemo } from 'react'
import { usePoolDatas } from 'data/pools/poolData'

export default function Updater(): null {
  // updaters
  const updatePoolData = useUpdatePoolData()

  // data
  const allPoolData = useAllPoolData()

  // detect for which addresses we havent loaded pool data yet
  const unfetchedPoolAddresses = useMemo(() => {
    return Object.keys(allPoolData).reduce((accum: string[], key) => {
      const poolData = allPoolData[key]
      if (!poolData.data || !poolData.lastUpdated) {
        accum.push(key)
      }
      return accum
    }, [])
  }, [allPoolData])

  // update unloaded pool entries with fetched data
  const { error: poolDataError, loading: poolDataLoading, data: poolDatas } = usePoolDatas(unfetchedPoolAddresses)

  useEffect(() => {
    if (poolDatas && !poolDataError && !poolDataLoading) {
      updatePoolData(Object.values(poolDatas))
    }
  }, [poolDataError, poolDataLoading, poolDatas, updatePoolData])

  return null
}
