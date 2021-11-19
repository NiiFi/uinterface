export type Token = {
  id: string
  symbol: string
  __typename: 'Token'
}
export type Pair = {
  token0: Token
  token1: Token
  __typename: 'Pair'
}

export type TransactionTypes = 'All' | 'Mint' | 'Swap' | 'Burn'

type ITokenTransaction = {
  address: string
  symbol: string
  amountIn: string
  amountOut: string
}

export type TransactionTableData = {
  type: TransactionTypes
  wallet: string
  pool: string
  hash: string
  amountUSD: string
  timestamp: number
  token0: ITokenTransaction
  token1: ITokenTransaction
}

export type TokenOutput = Token & {
  name: string
  derivedETH: string
  feesUSD: string
  totalValueLocked: string
  totalValueLockedUSD: string
  txCount: string
  volume: string
  volumeUSD: string
}

export type TokenListQuery = {
  tokens: Array<TokenOutput>
}

export type PoolTableData = {
  pair: Pair
  roiW: string
  roiY: string
  trendingPercent: string
  trendingSum: string
  __typename: 'Pool'
}

export type TopTokensTableData = {
  address: string
  priceUSD: string
  priceUSDChange: string
  symbol: string
  tvlUSD: string
  volumeUSD: string
  url: string
}

export type TableDataTypes = TransactionTableData | PoolTableData | TopTokensTableData
