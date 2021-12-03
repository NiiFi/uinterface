import { useEffect } from 'react'
import useLazyFetch from 'hooks/useLazyFetch'
import { WEB_API_BASE } from 'constants/general'
import { TopTokensTableData, TransactionTableData } from 'components/Table/types'
import { LoaderWrapped } from 'theme/components'

type Routes =
  | 'tokens'
  | 'tokens/gainers'
  | 'tokens/losers'
  | 'tokens/new'
  | 'tokens/stats'
  | 'pools'
  | 'pools/new'
  | 'pools/gainers'
  | 'pools/losers'
  | 'wallets/assets'
  | 'wallets/pools'
  | 'wallets/farms'
  | 'tokens/general-stats'
  | 'pools/stats-local-volume'
  | 'pools/transactions'

type ApiParams = {
  route: Routes
  limit?: number
  rootData?: boolean
}

const typeToSort: any = {
  gainers: '', // TODO: set -apy/apy for gainers/losers after BE implementation
  losers: '',
  new: '-timestamp',
}

interface FetchInterface<T> {
  loader: JSX.Element | boolean
  data?: T[] | undefined
}

interface FetchInterfaceDetail<T> {
  loader: JSX.Element
  data?: T | undefined
}

interface IGraph {
  time: string
  volume: number
  fees: number
}

export interface IPoolGraph extends IGraph {
  liquidity: number
}

interface ITokenGraph extends IGraph {
  tvl: number
}

export interface ITokenDetail {
  address: string
  decimals: number
  high_24h: string
  low_24h: string
  mcap: number
  price: string
  trading: number
  symbol: string
}

interface IPoolDetail {
  address: string
  liquidity: number
  apy: string
  apyTrading: string
  apyNii: string
  apyNiifi: string
  timestamp: number
  token1: ITokenDetail
  token2: ITokenDetail
}

export type PoolTypes = 'gainers' | 'losers' | 'new'

export default function useApi({ route, limit, rootData }: ApiParams): any {
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

export function useApiPoolsDetail(address: string): FetchInterfaceDetail<IPoolDetail> {
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

export function useApiStatsLocalTvl(): FetchInterface<ITokenGraph> {
  return useApi({ route: 'tokens/stats' })
}

export function useApiTransactions(): FetchInterface<TransactionTableData> {
  return useApi({ route: 'pools/transactions' })
}
