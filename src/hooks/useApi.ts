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
  | 'wallets/assets'
  | 'wallets/pools'
  | 'wallets/farms'
  | 'tokens/general-stats'
  | 'pools/stats-local-volume'
  | 'pools/stats-local-tvl'

type ApiParams = {
  route: Routes
  limit?: number
  rootData?: boolean
}

const typeToSort: any = {
  gainers: '-trendingPercentY',
  losers: 'trendingPercentY',
  new: '-timestamp',
}

interface FetchInterface<T> {
  loader: any // TODO: add proper type
  data?: T[] | undefined
}

export interface IPoolGraph {
  time: string
  liquidity: number
  volume: number
  fees: number
}

export type PoolTypes = 'gainers' | 'losers' | 'new'

export default function useApi({ route, limit, rootData }: ApiParams): FetchInterface<any> {
  // TODO: re-check limit usage with real API
  // const apiUrl = `${WEB_API_BASE}${route}` + (limit ? '?' + new URLSearchParams({ _limit: limit.toString() }) : '')
  const apiUrl = `${WEB_API_BASE}${route}`
  const [fetch, { data, error, loading }] = useLazyFetch<any[]>(apiUrl, rootData)

  useEffect(() => {
    route && fetch()
  }, [route, fetch, limit])

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
// TODO: add correct return types instead of 'any' bellow
export function useApiToken(address: string): any {
  return useApi({ route: (address ? `tokens/${address}` : '') as Routes })
}

export function useApiTokens(): FetchInterface<TopTokensTableData> {
  return useApi({ route: 'tokens' })
}

export function useApiTokensGainers(): FetchInterface<any> {
  return useApi({ route: 'tokens?sort=-priceUSDChange' as Routes })
}

export function useApiTokensLosers(): FetchInterface<any> {
  return useApi({ route: 'tokens?sort=priceUSDChange' as Routes })
}

export function useApiPools(type?: PoolTypes, limit?: number): FetchInterface<any> {
  const route = ('pools' + (type && type in typeToSort ? `?sort=${typeToSort[type]}` : '')) as Routes
  return useApi({ route, limit })
}

export function useApiPoolsNew(): FetchInterface<any> {
  return useApiPools('new')
}

export function useApiPoolsDetail(address: string): any {
  return useApi({ route: `pools/${address}` as Routes })
}

export function useApiPoolStats(address: string, period: string): FetchInterface<IPoolGraph> {
  return useApi({ route: `pools/stats/${address}/${period}` as Routes })
}

export function useApiPoolStatsGeneral(period: string): FetchInterface<IPoolGraph> {
  return useApi({ route: `pools/stats/${period}` as Routes })
}

export function useApiUserWallet(address: string | null | undefined): any {
  const route = `wallets/${address}` as Routes
  return useApi({ route, rootData: true })
}

export function useApiUserAssets(address: string | null | undefined, limit?: number): any {
  const route = `wallets/${address}/assets` as Routes
  return useApi({ route, limit, rootData: true })
}

export function useApiUserPools(address: string | null | undefined, limit?: number): any {
  const route = `wallets/${address}/pools` as Routes
  return useApi({ route, limit, rootData: true })
}

export function useApiUserFarming(address: string | null | undefined, limit?: number): any {
  const route = `wallets/${address}/farms` as Routes
  return useApi({ route, limit, rootData: true })
}

export function useApiUserHistory(address: string | null | undefined): any {
  return useApi({ route: `wallets/${address}/transactions` as Routes })
}

export function useApiStatsLocal(): any {
  return useApi({ route: 'tokens/general-stats' })
}

export function useApiStatsLocalVolume(): any {
  return useApi({ route: 'pools/stats-local-volume' })
}

export function useApiStatsLocalTvl(): any {
  // TODO: replace with 'pools/stats-local-tvl' after BE implementation
  return useApiPoolStats('0x9928e4046d7c6513326ccea028cd3e7a91c7590a', 'week')
  // return useApi({ route: 'pools/stats-local-tvl' })
}

export function useApiTransactions(): any {
  return useApi({ route: 'wallets/0x0000000000000000000000000000000000000001/transactions' as Routes }) // TODO: replace with correct route after implementation
}
