import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import { Trans } from '@lingui/macro'
import { ButtonGray, ButtonEmpty } from 'components/Button'
import Card, { DefaultCard } from 'components/Card'
import CurrencyAvatar from 'components/CurrencyAvatar'
import LendHistory from 'components/LineChart/LendHistory'
import DepositApr from 'components/LineChart/DepositApr'
import UtilisationRate from 'components/LineChart/UtilisationRate'
import { ResponsiveRow, RowFixed } from 'components/Row'
import { WalletConnect } from 'components/Wallet'
import { useApiMarket } from 'hooks/useApi'
import { useActiveWeb3React } from 'hooks/web3'
import { BaseCurrencyView, FlexRowWrapper, TYPE } from 'theme'
import { shortenDecimalValues, getContract } from 'utils'
import { FixedNumber, formatFixed } from '@ethersproject/bignumber'
import ERC20_ABI from 'abis/erc20.json'
import DATA_PROVIDER_ABI from 'abis/lending-protocol-data-provider.json'
import LENDING_POOL_ABI from 'abis/lending-pool.json'
import LENDING_PRICE_PROVIDER_ABI from 'abis/lending-price-provider.json'
import {
  PROTOCOL_DATA_PROVIDER_ADDRESS,
  LENDING_POOL_CONTRACT_ADDRESS,
  LENDING_PRICE_PROVIDER_ADDRESS,
} from 'constants/general'

export interface FormatReserveResponse {
  reserveFactor: string
  baseLTVasCollateral: string
  liquidityIndex: string
  reserveLiquidationThreshold: string
  reserveLiquidationBonus: string
  variableBorrowIndex: string
  availableLiquidity: string
  supplyAPY: string
  supplyAPR: string
  variableBorrowAPY: string
  variableBorrowAPR: string
  stableBorrowAPY: string
  stableBorrowAPR: string
  totalPrincipalStableDebt: string
  totalScaledVariableDebt: string
  utilizationRate: string
  totalStableDebt: string
  totalVariableDebt: string
  totalDebt: string
  totalLiquidity: string
}

export interface ComputedReserveData extends FormatReserveResponse {
  id: string
  underlyingAsset: string
  name: string
  symbol: string
  decimals: number
  usageAsCollateralEnabled: boolean
  borrowingEnabled: boolean
  stableBorrowRateEnabled: boolean
  isActive: boolean
  isFrozen: boolean
  aTokenAddress: string
  stableDebtTokenAddress: string
  variableDebtTokenAddress: string
  priceInMarketReferenceCurrency: string
  avg30DaysLiquidityRate?: string
  avg30DaysVariableBorrowRate?: string
}

export default function MarketsDetail({ address }: { address: string }) {
  const theme = useContext(ThemeContext)
  const [walletBalance, setWalletBalance] = useState('0')
  const [deposited, setDeposited] = useState('0')
  const [borrowed, setBorrowed] = useState('0')
  const [healthFactor, setHealthFactor] = useState('0')
  const [ltv, setLtv] = useState('0')
  const [availableToBorrow, setAvailableToBorrow] = useState('0')
  const [reserveConfig, setReserveConfig] = useState<ComputedReserveData>()
  const [useAsCollateralltv, setUseAsCollateral] = useState(false)
  const { data, loader, abortController } = useApiMarket(address)

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { account, library, chainId } = useActiveWeb3React()

  useEffect(() => {
    if (!account || !library || !chainId) return
    const tokenContract = getContract(address, ERC20_ABI, library, account)
    const protocolDataProviderContract = getContract(
      PROTOCOL_DATA_PROVIDER_ADDRESS,
      DATA_PROVIDER_ABI,
      library,
      account
    )
    const lendingPoolContract = getContract(LENDING_POOL_CONTRACT_ADDRESS, LENDING_POOL_ABI, library, account)
    const lendingPriceProviderContract = getContract(
      LENDING_PRICE_PROVIDER_ADDRESS,
      LENDING_PRICE_PROVIDER_ABI,
      library,
      account
    )

    Promise.all([
      tokenContract.balanceOf(account),
      tokenContract.decimals(),
      protocolDataProviderContract.getUserReserveData(address, account),
      protocolDataProviderContract.getReserveConfigurationData(address),
      lendingPoolContract.getUserAccountData(account),
      lendingPriceProviderContract.getAssetPrice(address),
    ])
      .then((data) => {
        const [token, decimals, reserve, reserveConfig, pool, assetPrice] = data
        const currentVariableDebt = formatFixed(reserve.currentVariableDebt, decimals)
        const currentStableDebt = formatFixed(reserve.currentStableDebt, decimals)
        const availableBorrowsETH = formatFixed(pool.availableBorrowsETH, decimals)
        const assetPriceFormated = formatFixed(assetPrice, decimals)

        setWalletBalance(formatFixed(token, decimals))
        setDeposited(formatFixed(reserve.currentATokenBalance, decimals))
        setBorrowed(FixedNumber.from(currentVariableDebt).addUnsafe(FixedNumber.from(currentStableDebt)).toString())
        setHealthFactor(formatFixed(pool.healthFactor, decimals))
        setLtv(formatFixed(pool.ltv, 2))
        setUseAsCollateral(reserve.usageAsCollateralEnabled)
        setReserveConfig(reserveConfig)
        setAvailableToBorrow(
          FixedNumber.from(availableBorrowsETH)
            .divUnsafe(FixedNumber.from(assetPriceFormated))
            .mulUnsafe(FixedNumber.from('0.99'))
            .toString()
        )
      })
      .catch((e) => console.log(e))
  }, [account, library, chainId, address])

  return (
    <>
      {loader ||
        (data && (
          <>
            <ResponsiveRow gap="2rem">
              <DefaultCard>
                <LendHistory address={data.address} />
              </DefaultCard>
              <DefaultCard>
                <DepositApr address={data.address} />
              </DefaultCard>
              <DefaultCard>
                <UtilisationRate address={data.address} />
              </DefaultCard>
            </ResponsiveRow>
            <ResponsiveRow gap="2rem">
              <DefaultCard width="66%">
                <TYPE.body>
                  <Trans>Reserve Status & Configuration</Trans>
                </TYPE.body>
                <ResponsiveRow gap="2rem" style={{ marginTop: '20px' }}>
                  <Card>
                    <RowFixed style={{ justifyContent: 'start' }}>
                      <TYPE.body>
                        <div style={{ width: 132, height: 132 }}>
                          <CircularProgressbarWithChildren
                            value={parseFloat(data.utilizationRate)}
                            styles={buildStyles({
                              strokeLinecap: 'butt',
                              pathColor: theme.orange1,
                              trailColor: theme.green2,
                            })}
                          >
                            <div style={{ position: 'relative', top: '-5px' }}>
                              <CurrencyAvatar
                                symbol=""
                                address={data.address}
                                hideSymbol={true}
                                iconProps={{ width: '45', height: '45' }}
                              />
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      </TYPE.body>
                      <TYPE.body style={{ marginLeft: '45px' }}>
                        <TYPE.orange>
                          <Trans>Total Borrowed</Trans>
                        </TYPE.orange>
                        <TYPE.black fontSize={16} margin="10px 0">
                          {shortenDecimalValues(data.totalBorrowed)}
                        </TYPE.black>
                        <TYPE.darkGray fontSize={12} margin="10px 0">
                          <BaseCurrencyView
                            type="symbol"
                            value={
                              FixedNumber.from(data.totalBorrowed)
                                .mulUnsafe(FixedNumber.from(data.priceUSD))
                                .toString() as unknown as number
                            }
                          />
                        </TYPE.darkGray>
                        <TYPE.green marginTop="10px">
                          <Trans>Available Liquidity</Trans>
                        </TYPE.green>
                        <TYPE.black fontSize={16} margin="10px 0">
                          {shortenDecimalValues(data.availableLiquidity)}
                        </TYPE.black>
                        <TYPE.darkGray fontSize={12} margin="10px 0">
                          <BaseCurrencyView
                            type="symbol"
                            value={
                              FixedNumber.from(data.availableLiquidity)
                                .mulUnsafe(FixedNumber.from(data.priceUSD))
                                .toString() as unknown as number
                            }
                          />
                        </TYPE.darkGray>
                      </TYPE.body>
                    </RowFixed>
                  </Card>
                  <DefaultCard style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <TYPE.black fontSize={16} fontWeight={400}>
                      <Trans>Reserve Size</Trans>
                    </TYPE.black>
                    <TYPE.black fontSize={16}>
                      <BaseCurrencyView
                        type="symbol"
                        value={
                          FixedNumber.from(data.marketSize)
                            .mulUnsafe(FixedNumber.from(data.priceUSD))
                            .toString() as unknown as number
                        }
                      />
                    </TYPE.black>
                    <div style={{ width: '100%', borderTop: `1px solid ${theme.bg3}`, margin: '15px 0' }} />
                    <TYPE.black fontSize={16} fontWeight={400}>
                      <Trans>Utilisation Rate</Trans>
                    </TYPE.black>
                    <TYPE.black fontSize={16}>{shortenDecimalValues(data.utilizationRate)}%</TYPE.black>
                  </DefaultCard>
                </ResponsiveRow>
                <ResponsiveRow gap="2rem" style={{ marginTop: '20px' }}>
                  <DefaultCard>
                    <TYPE.body style={{ marginBottom: '16px' }}>
                      <Trans>Deposit</Trans>
                    </TYPE.body>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Deposit APY</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.depositAPY)}%</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Deposit APR</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.depositAPR)}%</TYPE.common>
                    </FlexRowWrapper>
                  </DefaultCard>
                  <DefaultCard>
                    <TYPE.body style={{ marginBottom: '16px' }}>
                      <Trans>Stable Borrowing</Trans>
                    </TYPE.body>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Borrow APY</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.stableBorrowAPY)}%</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Borrow APR</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.stableBorrowAPR)}%</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>% over total</Trans>
                      </TYPE.common>
                      <TYPE.common>-</TYPE.common>
                    </FlexRowWrapper>
                  </DefaultCard>
                  <DefaultCard>
                    <TYPE.body style={{ marginBottom: '16px' }}>
                      <Trans>Variable Borrowing</Trans>
                    </TYPE.body>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Borrow APY</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.variableBorrowAPY)}%</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Borrow APR</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(data.variableBorrowAPR)}%</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>% over total</Trans>
                      </TYPE.common>
                      <TYPE.common>-</TYPE.common>
                    </FlexRowWrapper>
                  </DefaultCard>
                </ResponsiveRow>
              </DefaultCard>
              <DefaultCard width="32%">
                <TYPE.body style={{ marginBottom: '16px' }}>
                  <Trans>Your Information</Trans>
                </TYPE.body>
                {account ? (
                  <>
                    <FlexRowWrapper>
                      <ButtonGray style={{ fontSize: '14px' }} padding={'10px 14px'}>
                        <Trans>Deposits</Trans>
                      </ButtonGray>
                      <ButtonEmpty style={{ fontSize: '14px' }} padding={'10px 14px'}>
                        <Trans>Withdraw</Trans>
                      </ButtonEmpty>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Your wallet balance</Trans>
                      </TYPE.common>
                      <TYPE.common>
                        {shortenDecimalValues(walletBalance)} {data.symbol}
                      </TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>You already deposited</Trans>
                      </TYPE.common>
                      <TYPE.common>
                        {shortenDecimalValues(deposited)} {data.symbol}
                      </TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Use as collateral</Trans>
                      </TYPE.common>
                      <TYPE.common>{useAsCollateralltv.toString()}</TYPE.common>
                    </FlexRowWrapper>
                    <ButtonGray style={{ fontSize: '14px' }} padding={'10px 14px'} margin={'16px 0'} width={'50%'}>
                      <Trans>Borrows</Trans>
                    </ButtonGray>{' '}
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Borrowed</Trans>
                      </TYPE.common>
                      <TYPE.common>
                        {shortenDecimalValues(borrowed)} {data.symbol}
                      </TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Health factor</Trans>
                      </TYPE.common>
                      <TYPE.common>{shortenDecimalValues(healthFactor)}</TYPE.common>
                    </FlexRowWrapper>
                    <FlexRowWrapper>
                      <TYPE.common>
                        <Trans>Loan to value</Trans>
                      </TYPE.common>
                      <TYPE.common>{ltv}%</TYPE.common>
                    </FlexRowWrapper>
                    {reserveConfig?.borrowingEnabled && (
                      <FlexRowWrapper>
                        <TYPE.common>
                          <Trans>Available to you</Trans>
                        </TYPE.common>
                        <TYPE.common>
                          {shortenDecimalValues(availableToBorrow)} {data.symbol}
                        </TYPE.common>
                      </FlexRowWrapper>
                    )}
                  </>
                ) : (
                  <WalletConnect />
                )}
              </DefaultCard>
            </ResponsiveRow>
          </>
        ))}
    </>
  )
}
