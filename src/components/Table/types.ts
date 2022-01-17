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
  apy: string
  liquidity: string
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

export type AssetsTableData = {
  address: string
  symbol: string
  balance: number
  price: number
  total: number
}

export type MarketTableData = {
  address: string
  symbol: string
  priceUSD: string
  marketSize: string
  totalBorrowed: string
  availableLiquidity: string
  depositAPY: string
  variableBorrowAPY: string
  stableBorrowAPY: string
  usedAsCollateral: boolean
  stableBorrowing: boolean
  timestamp: number
  aTokenAddress: string
  variableDebtTokenAddress: string
  stableDebtTokenAddress: string
}

export type TableDataTypes =
  | TransactionTableData
  | PoolTableData
  | TopTokensTableData
  | AssetsTableData
  | MarketTableData
