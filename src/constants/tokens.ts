import { WETH9, Token, Ether } from '@uniswap/sdk-core'
import { NIIFI_ADDRESS } from './addresses'
import { SupportedChainId } from './chains'
import { t } from '@lingui/macro'
export const NII: { [chainId: number]: Token } = {
  [SupportedChainId.NAHMII_MAINNET]: new Token(
    SupportedChainId.NAHMII_MAINNET,
    NIIFI_ADDRESS[SupportedChainId.NAHMII_MAINNET],
    18,
    'NII',
    'NIIFI'
  ),
  [SupportedChainId.NAHMII_TESTNET]: new Token(
    SupportedChainId.NAHMII_TESTNET,
    NIIFI_ADDRESS[SupportedChainId.NAHMII_TESTNET],
    18,
    'NII',
    'NIIFI'
  ),
}

export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  ...WETH9,
  [SupportedChainId.NAHMII_MAINNET]: new Token(
    SupportedChainId.NAHMII_MAINNET,
    '0x4200000000000000000000000000000000000006', // TODO: move to .env
    18,
    'ETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.NAHMII_TESTNET]: new Token(
    SupportedChainId.NAHMII_TESTNET,
    '0x4200000000000000000000000000000000000006', // TODO: move to .env
    18,
    'ETH',
    'Wrapped Ether'
  ),
}

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    if (this.chainId in WETH9_EXTENDED) return WETH9_EXTENDED[this.chainId]
    throw new Error('Unsupported chain ID')
  }

  public static onChain(chainId: number): ExtendedEther {
    return new ExtendedEther(chainId)
  }
}

// export const TOKEN_VALUE_CURRENCY_FORMAT = '0.[00000]a'
export const TOKEN_VALUE_CURRENCY_FORMAT = '0,0.[00000]a'

export const SUPPORTED_BASE_CURRENCIES = [
  'USD',
  'EUR',
  'CNY',
  'INR',
  'CAD',
  'GBP',
  'JPY',
  'RUB',
  'MXN',
  'CHF',
  'KRW',
  'TRY',
  'BRL',
  'SEK',
  'HKD',
  'ETH',
  'AUD',
  'NOK',
  'SGD',
  'BTC',
] as const

export type SupportedBaseCurrencies = typeof SUPPORTED_BASE_CURRENCIES[number]
export const DEFAULT_BASE_CURRENCY: SupportedBaseCurrencies = 'USD'
export type BaseCurrencyDetail = {
  id: SupportedBaseCurrencies
  label: string
  symbol: string
}
export const SUPPORTED_BASE_CURRENCIES_MAP: { [currency in SupportedBaseCurrencies]: BaseCurrencyDetail } = {
  USD: {
    label: t`United State Dollar`,
    id: t`USD` as SupportedBaseCurrencies,
    symbol: '$',
  },
  ETH: {
    label: t`Ethereum`,
    id: t`ETH` as SupportedBaseCurrencies,
    symbol: 'Ξ',
  },
  CAD: {
    label: t`Canadian Dollar`,
    id: t`CAD` as SupportedBaseCurrencies,
    symbol: 'C$',
  },
  CHF: {
    label: t`Swiss Franc`,
    id: t`CHF` as SupportedBaseCurrencies,
    symbol: '₣',
  },
  INR: {
    label: t`Indian Rupees`,
    id: t`INR` as SupportedBaseCurrencies,
    symbol: '₹',
  },
  HKD: {
    label: t`Hong Kong Dollar`,
    id: t`HKD` as SupportedBaseCurrencies,
    symbol: 'HK$',
  },
  EUR: {
    label: t`European Union Euro`,
    id: t`EUR` as SupportedBaseCurrencies,
    symbol: '€',
  },
  BTC: {
    label: t`Bitcoin`,
    id: t`BTC` as SupportedBaseCurrencies,
    symbol: '฿',
  },
  CNY: {
    label: t`Chinese Yuan`,
    id: t`CNY` as SupportedBaseCurrencies,
    symbol: '¥',
  },
  GBP: {
    label: t`United Kingdom Pound`,
    id: t`GBP` as SupportedBaseCurrencies,
    symbol: '£',
  },
  RUB: {
    label: t`Russian Ruble`,
    id: t`RUB` as SupportedBaseCurrencies,
    symbol: '₽',
  },
  MXN: {
    label: t`Mexican Peso`,
    id: t`MXN` as SupportedBaseCurrencies,
    symbol: 'mex$',
  },
  KRW: {
    label: t`South Korean Won`,
    id: t`KRW` as SupportedBaseCurrencies,
    symbol: '₩',
  },
  TRY: {
    label: t`Turkish Lira`,
    id: t`TRY` as SupportedBaseCurrencies,
    symbol: '₺',
  },
  JPY: {
    label: t`Japanese Yen`,
    id: t`JPY` as SupportedBaseCurrencies,
    symbol: '¥',
  },
  BRL: {
    label: t`Brazilian Real`,
    id: t`BRL` as SupportedBaseCurrencies,
    symbol: 'R$',
  },
  SEK: {
    label: t`Swedish Krona`,
    id: t`SEK` as SupportedBaseCurrencies,
    symbol: 'kr',
  },
  AUD: {
    label: t`Australian Dollar`,
    id: t`AUD` as SupportedBaseCurrencies,
    symbol: 'A$',
  },
  NOK: {
    label: t`Norwegian Krone`,
    id: t`NOK` as SupportedBaseCurrencies,
    symbol: 'kr',
  },
  SGD: {
    label: t`Singapore Dollar`,
    id: t`SGD` as SupportedBaseCurrencies,
    symbol: 'S$',
  },
}

export const BASE_CURRENCY_RATES_URL = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${SUPPORTED_BASE_CURRENCIES.join(
  ','
)}`
export type BASE_CURRENCY_RATES_RESPONSE = {
  ethereum: {
    [key: string]: number
  }
}
