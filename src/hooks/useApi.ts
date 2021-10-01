import { useEffect } from 'react'
import useLazyFetch from 'hooks/useLazyFetch'
import { WEB_API_BASE } from 'constants/general'
import { TopTokensTableData } from 'components/Table/types'
import { LoaderWrapped } from 'theme/components'

type Routes =
  | 'tokens'
  | 'tokens/gainers'
  | 'tokens/losers'
  | 'tokens/new'
  | 'pools'
  | 'pools/new'
  | 'pools/gainers'
  | 'pools/losers'
  | 'user/assets'
  | 'user/pools'
  | 'user/farming'
  | 'stats-local'
  | 'stats-local-volume'
  | 'stats-local-tvl'

type ApiParams = {
  route: Routes
  limit?: number
}

interface FetchInterface<T> {
  loader: any // TODO: add proper type
  data?: T[] | undefined
}

export type PoolTypes = 'gainers' | 'losers' | 'new'

export default function useApi({ route, limit }: ApiParams): FetchInterface<any> {
  // TODO: re-check limit usage with real API
  // const apiUrl = `${WEB_API_BASE}${route}` + (limit ? '?' + new URLSearchParams({ _limit: limit.toString() }) : '')
  const apiUrl = `${WEB_API_BASE}${route}`
  const [fetch, { data, error, loading }] = useLazyFetch<any[]>(apiUrl)

  useEffect(() => {
    fetch()
  }, [fetch, limit])

  // TODO: add error handling
  useEffect(() => {
    if (!error) {
      return
    }
    console.log(error)
  }, [error])

  if (loading) {
    return { loader: LoaderWrapped(), data: [] }
  }

  return { loader: false, data }
}

export function useApiTokens(): FetchInterface<TopTokensTableData> {
  return useApi({ route: 'tokens' })
}
// TODO: add correct return types instead of 'any' bellow
export function useApiTokensGainers(): FetchInterface<any> {
  return useApi({ route: 'tokens/gainers' })
}

export function useApiTokensLosers(): FetchInterface<any> {
  return useApi({ route: 'tokens/losers' })
}

export function useApiPools(type?: PoolTypes, limit?: number): FetchInterface<any> {
  const route = ('pools' + (type ? `/${type}` : '')) as Routes
  return useApi({ route, limit })
}

export function useApiPoolsNew(): FetchInterface<any> {
  return useApiPools('new')
}

export function useApiPoolsDetail(address: string): any {
  return useApi({ route: `pools/${address}` as Routes })
}

export function useApiUserWallet(address: string | null | undefined): any {
  const route = `user/${address}` as Routes
  return useApi({ route })
}

export function useApiUserAssets(address: string | null | undefined, limit?: number): any {
  const route = `user/${address}/assets` as Routes
  return useApi({ route, limit })
}

export function useApiUserPools(address: string | null | undefined, limit?: number): any {
  const route = `user/${address}/pools` as Routes
  return useApi({ route, limit })
}

export function useApiUserFarming(address: string | null | undefined, limit?: number): any {
  const route = `user/${address}/farming` as Routes
  return useApi({ route, limit })
}

export function useApiStatsLocal(): any {
  return useApi({ route: 'stats-local' })
}

export function useApiStatsLocalVolume(): any {
  return useApi({ route: 'stats-local-volume' })
}

export function useApiStatsLocalTvl(): any {
  return useApi({ route: 'stats-local-tvl' })
}
