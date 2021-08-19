import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

const PairFields = `
  fragment PairFields on Pair {
    id
    txCount
    token0 {
      id
      symbol
      name
      totalLiquidity
      derivedETH
    }
    token1 {
      id
      symbol
      name
      totalLiquidity
      derivedETH
    }
    reserve0
    reserve1
    reserveUSD
    totalSupply
    trackedReserveETH
    reserveETH
    volumeUSD
    untrackedVolumeUSD
    token0Price
    token1Price
    createdAtTimestamp
  }
`

export const PAIRS_BULK = gql`
  ${PairFields}
  query pairs($allPairs: [Bytes]!) {
    pairs(first: 500, where: { id_in: $allPairs }, orderBy: trackedReserveETH, orderDirection: desc) {
      ...PairFields
    }
  }
`

interface PoolFields {
  id: string
  feeTier: string
  liquidity: string
  sqrtPrice: string
  tick: string
  token0: {
    id: string
    symbol: string
    name: string
    decimals: string
    derivedETH: string
  }
  token1: {
    id: string
    symbol: string
    name: string
    decimals: string
    derivedETH: string
  }
  token0Price: string
  token1Price: string
  volumeUSD: string
  txCount: string
  totalValueLockedToken0: string
  totalValueLockedToken1: string
  totalValueLockedUSD: string
}

interface PoolDataResponse {
  pools: PoolFields[]
}

/**
 * Fetch top addresses by volume
 */
export function usePoolDatas(poolAddresses: string[]): {
  loading: boolean
  error: boolean
  data: any // FIXME
  // | {
  //     [address: string]: PoolData
  //   }
  // | undefined
} {
  // TODO: add data48, dataWeek, etc.

  const {
    loading: loading24,
    error: error24,
    data: data24,
  } = useQuery<PoolDataResponse>(PAIRS_BULK, {
    variables: {
      allPairs: poolAddresses,
    },
  })

  const anyError = Boolean(error24)
  const anyLoading = Boolean(loading24)

  // // return early if not all data yet
  if (anyError || anyLoading) {
    return {
      loading: anyLoading,
      error: anyError,
      data: undefined,
    }
  }

  data24?.pools
    ? data24.pools.reduce((accum: { [address: string]: PoolFields }, poolData) => {
        accum[poolData.id] = poolData
        return accum
      }, {})
    : {}

  return {
    loading: anyLoading,
    error: anyError,
    data: data24,
  }
}
