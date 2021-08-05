import { WETH9, Token, Ether } from '@uniswap/sdk-core'
import { UNI_ADDRESS } from './addresses'
import { SupportedChainId } from './chains'
import { t } from '@lingui/macro'
// export const AMPL = new Token(1, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')
// export const DAI = new Token(1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
// export const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
// export const USDT = new Token(1, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
// export const WBTC = new Token(1, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC')
// export const FEI = new Token(1, '0x956F47F50A910163D8BF957Cf5846D573E7f87CA', 18, 'FEI', 'Fei USD')
// export const TRIBE = new Token(1, '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B', 18, 'TRIBE', 'Tribe')
// export const FRAX = new Token(1, '0x853d955aCEf822Db058eb8505911ED77F175b99e', 18, 'FRAX', 'Frax')
// export const FXS = new Token(1, '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0', 18, 'FXS', 'Frax Share')
// export const renBTC = new Token(1, '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D', 8, 'renBTC', 'renBTC')
// export const UMA = new Token(1, '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828', 18, 'UMA', 'UMA Voting Token v1')
// export const ETH2X_FLI = new Token(
//   1,
//   '0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD',
//   18,
//   'ETH2x-FLI',
//   'ETH 2x Flexible Leverage Index'
// )
// Mirror Protocol compat.
// export const UST = new Token(1, '0xa47c8bf37f92abed4a126bda807a7b7498661acd', 18, 'UST', 'Wrapped UST')
// export const MIR = new Token(1, '0x09a3ecafa817268f77be1283176b946c4ff2e608', 18, 'MIR', 'Wrapped MIR')
export const UNI: { [chainId: number]: Token } = {
  [SupportedChainId.ROPSTEN]: new Token(SupportedChainId.ROPSTEN, UNI_ADDRESS[3], 18, 'UNI', 'Uniswap'),
}
export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  ...WETH9,
  // [SupportedChainId.ARBITRUM_KOVAN]: new Token(
  //   SupportedChainId.ARBITRUM_KOVAN,
  //   '0x4A5e4A42dC430f669086b417AADf2B128beFEfac',
  //   18,
  //   'WETH9',
  //   'Wrapped Ether'
  // ),
  // [SupportedChainId.ARBITRUM_ONE]: new Token(
  //   SupportedChainId.ARBITRUM_ONE,
  //   '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  //   18,
  //   'WETH',
  //   'Wrapped Ether'
  // ),
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

export const TOKEN_VALUE_CURRENCY_FORMAT = '0,0.00'

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
