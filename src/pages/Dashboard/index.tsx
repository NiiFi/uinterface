import React, { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components'
import Tab from 'components/tab/Tab'
import Tabs from 'components/tab/Tabs'
import DashboardHistoryTab from './tabs/history/DashboardHistoryTab'
import ToggleDrawer from 'components/Header/ToggleDrawer'
// import CollectionImage2 from 'assets/images/nft-collection-2.png'
// import CollectionImage3 from 'assets/images/nft-collection-3.png'
// import CollectionImage4 from 'assets/images/nft-collection-4.png'
import AppBar from 'components/AppBar'
import CurrencyDropdown from 'components/Dropdowns/CurrencyDropdown'
import AppBody from '../AppBody'
import TabPanel from 'components/tab/TabPanel'
import { ButtonPrimary } from 'components/Button'
import { CustomCard } from './components/Card'
import { AutoColumn, FlexColumn } from 'components/Column'
import { ResponsiveRow } from 'components/Row'
import { BodyScroller, CurrencySelectWrapper, TYPE, BaseCurrencyView } from 'theme'
// import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
// SVGs
import WalletSvgSrc from '../../assets/svg/wallet.svg'
import PoolsSvgSrc from '../../assets/svg/pools.svg'
// import YieldSvgSrc from '../../assets/svg/yield.svg'
// import NFTsSvgSrc from '../../assets/svg/nfts.svg'
// HOOKS
import { useActiveWeb3React } from 'hooks/web3'
// import { useCurrencyBalance } from 'state/wallet/hooks'
import { useWalletModalToggle } from 'state/application/hooks'
// import { useCurrency } from 'hooks/Tokens'
// import { useEthereumToBaseCurrencyRatesAndApiState } from 'state/user/hooks'
import { useAllTokenBalances } from 'state/wallet/hooks'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { useApiTokens } from 'hooks/useApi'
import {
  /*useApiUserWallet,*/
  useApiUserPools,
  /*useApiUserFarming,*/
  useApiStatsLocal,
} from 'hooks/useApi'
// import BuySection from './BuySection'
import OverviewChart from 'components/LineChart/overview'
import BarChart from 'components/BarChart/overview'
import { DefaultCard } from 'components/Card'
import { Wrapper } from 'components/swap/styleds'
import OverviewTable from 'components/Table/overview'
import { AssetsTableData } from 'components/Table/types'
import { LoaderWrapped } from 'theme/components'

const StyledAppBar = styled(AppBar)`
  padding: 0px 2rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 0px 0.625rem;
  `}
`

// const StyledAppBody = styled(AppBody)`
//   padding: 1.5rem;
//   ${({ theme }) => theme.mediaWidth.upToSmall`
//   padding: 0.5rem;
// `}
// `

// const SampleNFTData = [
//   {
//     src: CollectionImage4,
//     title: 'Anrgy Nahfrog',
//     value: 80.1,
//   },
//   {
//     src: CollectionImage2,
//     title: 'Latency Slap',
//     value: 45.1,
//   },
//   {
//     src: CollectionImage3,
//     title: 'Rich Nahfrog',
//     value: 10.6,
//   },
// ]

type WalletProps =
  | {
      balanceUSD: number
      data: AssetsTableData[]
      loader?: JSX.Element | boolean
    }
  | undefined

export function useWalletData(): WalletProps {
  const { data, abortController } = useApiTokens()
  const balances = useAllTokenBalances()

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return useMemo((): WalletProps => {
    if (!balances || !data || !data.length) return { balanceUSD: 0, data: [], loader: <LoaderWrapped /> }

    const balancesFormated: AssetsTableData[] = []
    let totalWalletBalance = 0

    Object.keys(balances).map(async (address) => {
      const symbol = balances[address]?.currency.symbol || ''
      const balance = parseFloat(formatCurrencyAmount(balances[address], 8))
      const price = parseFloat(data.find((x) => x.address === address)?.priceUSD || '')
      const total = balance * price
      totalWalletBalance += total
      balancesFormated.push({
        address,
        symbol,
        balance,
        price,
        total,
      })
    })

    balancesFormated.sort((a, b) => (a.symbol > b.symbol ? 1 : -1))

    return { balanceUSD: totalWalletBalance, data: balancesFormated }
  }, [balances, data])
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const { state } = useLocation<any>()
  const { account } = useActiveWeb3React()
  // const { ethereumToBaseCurrencyRates: rates } = useEthereumToBaseCurrencyRatesAndApiState()
  // const inputCurrency = useCurrency('ETH')
  // const balance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  // const balanceValue = balance && rates['USD'] ? Number(formatCurrencyAmount(balance, 4)) * rates['USD'] : 0
  const toggleWalletModal = useWalletModalToggle()

  // TODO: create API request only with active account
  // const { data: userWallet, loader: userWalletLoader, abortController: userWalletAbortController } = useApiUserWallet(account)
  const {
    data: userPools,
    loader: userPoolsLoader,
    abortController: userPoolsAbortController,
  } = useApiUserPools(account, 3)
  // const { data: userFarming, loader: userFarmingLoader } = useApiUserFarming(account, 3)
  const { data: statsData, loader: statsDataLoader, abortController: statsDataAbortController } = useApiStatsLocal()
  const userAssets = useWalletData()

  useEffect(() => {
    const url = new URL(location.href.replace('/#', ''))
    const tab = url.searchParams.get('tab')
    if (!tab) return

    setActiveTab(parseInt(tab))
  }, [])

  useEffect(() => {
    if (!state?.type) {
      return
    }

    const scrollTo = setTimeout(
      () => document.querySelector('#top-tokens-table')?.scrollIntoView({ behavior: 'smooth' }),
      800
    )
    return () => {
      clearTimeout(scrollTo)
    }
  }, [state])

  useEffect(() => {
    return () => {
      userPoolsAbortController.abort()
      statsDataAbortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const TabChangeHandler: any = (e: any, newValue: any) => setActiveTab(newValue)

  return (
    <>
      <StyledAppBar>
        <ToggleDrawer />
        <Tabs value={activeTab} onChange={TabChangeHandler}>
          <Tab key={`tab-0`} label={t`Overview`} />
          <Tab key={`tab-1`} label={t`My Positions`} />
          <Tab key={`tab-2`} label={t`History`} />
        </Tabs>
        <CurrencySelectWrapper>
          <CurrencyDropdown />
        </CurrencySelectWrapper>
      </StyledAppBar>
      <BodyScroller>
        <TabPanel key={'tab-panel-0'} activeIndex={activeTab} index={0}>
          <AutoColumn gap="lg">
            <ResponsiveRow gap="2rem">
              <AppBody size="md">
                <Wrapper>
                  <OverviewChart />
                </Wrapper>
              </AppBody>
              <AppBody size="md">
                <Wrapper>
                  <BarChart />
                </Wrapper>
              </AppBody>
            </ResponsiveRow>
            <ResponsiveRow gap="2rem">
              {statsDataLoader ||
                (statsData && (
                  <>
                    <DefaultCard width="100%" style={{ minHeight: '100px', paddingTop: '25px' }}>
                      <TYPE.subHeader fontSize="16px">
                        <Trans>Volume 24H</Trans>
                      </TYPE.subHeader>
                      <FlexColumn style={{ padding: '5px 0' }}>
                        <TYPE.mediumHeader color="text1">
                          <BaseCurrencyView type="symbol" value={statsData.volume_24} />
                        </TYPE.mediumHeader>
                        {/* TODO: add percentage when it'll be available in API */}
                        {/* <Percent value={7.258268337244848} fontWeight={400} /> */}
                      </FlexColumn>
                    </DefaultCard>
                    <DefaultCard width="100%" style={{ minHeight: '100px', paddingTop: '25px' }}>
                      <TYPE.subHeader fontSize="16px">
                        <Trans>Fees 24H</Trans>
                      </TYPE.subHeader>
                      <FlexColumn style={{ padding: '5px 0' }}>
                        <TYPE.mediumHeader color="text1">
                          <BaseCurrencyView type="symbol" value={statsData.fees_24} />
                        </TYPE.mediumHeader>
                        {/* <Percent value={7.858268337244848} fontWeight={400} /> */}
                      </FlexColumn>
                    </DefaultCard>
                    <DefaultCard width="100%" style={{ minHeight: '100px', paddingTop: '25px' }}>
                      <TYPE.subHeader fontSize="16px">
                        <Trans>TVL</Trans>
                      </TYPE.subHeader>
                      <FlexColumn style={{ padding: '5px 0' }}>
                        <TYPE.mediumHeader color="text1">
                          <BaseCurrencyView type="symbol" value={statsData.tvl} />
                        </TYPE.mediumHeader>
                        {/* <Percent value={-0.508268337244848} fontWeight={400} /> */}
                      </FlexColumn>
                    </DefaultCard>
                  </>
                ))}
            </ResponsiveRow>
            <ResponsiveRow id="top-tokens-table">
              <AppBody size="lg">
                <OverviewTable />
              </AppBody>
            </ResponsiveRow>
          </AutoColumn>
        </TabPanel>
        <TabPanel key={'tab-panel-1'} activeIndex={activeTab} index={1}>
          <AutoColumn gap="lg">
            {account ? (
              <>
                {/* <ResponsiveRow>
                  <StyledAppBody size="lg">
                    {userWalletLoader ||
                      (userWallet && (
                        <BuySection account={account} balanceValue={balanceValue} data={userWallet.data} />
                      ))}
                  </StyledAppBody>
                </ResponsiveRow> */}
                <ResponsiveRow gap="2rem">
                  <AppBody size="md">
                    {userAssets?.loader ||
                      (userAssets?.data && (
                        <CustomCard
                          balance={userAssets.balanceUSD}
                          svgIconSrc={WalletSvgSrc}
                          data={userAssets.data.slice(0, 3)}
                          type={'wallet'}
                        />
                      ))}
                  </AppBody>
                  <AppBody size="md">
                    {userPoolsLoader ||
                      (userPools?.data && (
                        <CustomCard
                          balance={userPools.balanceUSD}
                          svgIconSrc={PoolsSvgSrc}
                          data={userPools.data.slice(0, 3)}
                          type={'pools'}
                        />
                      ))}
                  </AppBody>
                </ResponsiveRow>
                {/* <ResponsiveRow gap="2rem">
                  <AppBody size="md">
                    {userFarmingLoader ||
                      (userFarming?.data && (
                        <CustomCard
                          balance={userFarming.balanceUSD}
                          svgIconSrc={YieldSvgSrc}
                          data={userFarming.data.slice(0, 3)}
                          type={'farm'}
                        />
                      ))}
                  </AppBody>
                  <AppBody size="md">
                    <CustomCard balance={balanceValue} svgIconSrc={NFTsSvgSrc} data={SampleNFTData} type={'nfts'} />
                  </AppBody>
                </ResponsiveRow> */}
              </>
            ) : (
              <ButtonPrimary onClick={toggleWalletModal}>
                <Trans>Connect Wallet</Trans>
              </ButtonPrimary>
            )}
          </AutoColumn>
        </TabPanel>
        <TabPanel key={'tab-panel-2'} activeIndex={activeTab} index={2}>
          <AutoColumn gap="lg">
            {account ? (
              <ResponsiveRow>
                <DashboardHistoryTab />
              </ResponsiveRow>
            ) : (
              <ButtonPrimary onClick={toggleWalletModal}>
                <Trans>Connect Wallet</Trans>
              </ButtonPrimary>
            )}
          </AutoColumn>
        </TabPanel>
      </BodyScroller>
    </>
  )
}
