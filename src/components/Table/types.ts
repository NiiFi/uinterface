export type Transaction = {
  id: string
  timestamp: string
  __typename: 'Transaction'
}
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

export type Swap = {
  transaction: Transaction
  pair: Pair
  amount0In: string
  amount0Out: string
  amount1In: string
  amount1Out: string
  amountUSD: string
  to: string
  __typename: 'Swap'
}

export type Burn = {
  transaction: Transaction
  pair: Pair
  sender: string
  liquidity: string
  amount0: string
  amount1: string
  amountUSD: string
  __typename: 'Burn'
}

export type Mint = {
  transaction: Transaction
  pair: Pair
  to: string
  liquidity: string
  amount0: string
  amount1: string
  amountUSD: string
  __typename: 'Mint'
}
export type TransactionTypes = 'All' | 'Mint' | 'Swap' | 'Burn'

export type TransactionOutput = {
  swaps: Array<Swap>
  burns: Array<Burn>
  mints: Array<Mint>
}

export type TransactionListQuery = {
  transactions: Array<TransactionOutput>
}

export type TransactionTableData = {
  transaction: Transaction
  pair: Pair
  address: string
  amount0: string
  amount1: string
  amountUSD: string
  __typename: TransactionTypes
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
