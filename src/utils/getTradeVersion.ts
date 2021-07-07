import { Currency, TradeType } from '@uniswap/sdk-core'
import { Trade } from '@uniswap/v2-sdk'
import { Version } from '../hooks/useToggledVersion'

export function getTradeVersion(trade?: Trade<Currency, Currency, TradeType>): Version | undefined {
  if (!trade) return undefined
  return Version.v2
}
