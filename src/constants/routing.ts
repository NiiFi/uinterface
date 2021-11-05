// a list of tokens by chain
import { Currency, Token } from '@uniswap/sdk-core'
import { SupportedChainId } from './chains'
import { /*ExtendedEther,*/ WETH9_EXTENDED } from './tokens'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

type ChainCurrencyList = {
  readonly [chainId: number]: Currency[]
}

// List of all mirror's assets addresses.
// Last pulled from : https://whitelist.mirror.finance/eth/tokenlists.json
// TODO: Generate this programmatically ?
// const mAssetsAdditionalBases: { [tokenAddress: string]: Token[] } = {
//   [UST.address]: [MIR],
//   [MIR.address]: [UST],
//   '0xd36932143F6eBDEDD872D5Fb0651f4B72Fd15a84': [MIR, UST], // mAAPL
//   '0x59A921Db27Dd6d4d974745B7FfC5c33932653442': [MIR, UST], // mGOOGL
// }
const WETH_ONLY: ChainTokenList = {
  [SupportedChainId.NAHMII_MAINNET]: [WETH9_EXTENDED[SupportedChainId.NAHMII_MAINNET]],
  [SupportedChainId.NAHMII_TESTNET]: [WETH9_EXTENDED[SupportedChainId.NAHMII_TESTNET]],
}
// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  // [1]: [...WETH_ONLY[1], DAI, USDC, USDT, WBTC],
}
export const ADDITIONAL_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {
  // [1]: {
  //   ...mAssetsAdditionalBases,
  //   '0xF16E4d813f4DcfDe4c5b44f305c908742De84eF0': [ETH2X_FLI],
  //   '0xA948E86885e12Fb09AfEF8C52142EBDbDf73cD18': [UNI[1]],
  //   '0xB46F57e7Ce3a284d74b70447Ef9352B5E5Df8963': [UMA],
  //   [FEI.address]: [TRIBE],
  //   [TRIBE.address]: [FEI],
  // },
}
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {
  // [1]: {
  //   [AMPL.address]: [DAI, WETH9_EXTENDED[1]],
  // },
}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainCurrencyList = {
  [SupportedChainId.NAHMII_MAINNET]: [WETH9_EXTENDED[SupportedChainId.NAHMII_MAINNET]],
  [SupportedChainId.NAHMII_TESTNET]: [WETH9_EXTENDED[SupportedChainId.NAHMII_TESTNET]],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  // [1]: [...WETH_ONLY[1], DAI, USDC, USDT, WBTC],
}
export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  // [1]: [
  //   [
  //     new Token(1, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
  //     new Token(1, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin'),
  //   ],
  //   [USDC, USDT],
  //   [DAI, USDT],
  // ],
}
