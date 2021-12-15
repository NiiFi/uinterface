import { Currency, TradeType } from '@niifi/godzilla2-sdk'
import { Trade } from '@niifi/godzilla2-sdk'
import { Version } from '../hooks/useToggledVersion'

export function getTradeVersion(trade?: Trade<Currency, Currency, TradeType>): Version | undefined {
  if (!trade) return undefined
  return Version.v2
}
