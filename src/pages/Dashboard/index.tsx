import React, { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { t } from '@lingui/macro'
import styled from 'styled-components'
import Tab from 'components/tab/Tab'
import Tabs from 'components/tab/Tabs'
import DashboardHistoryTab from './tabs/DashboardHistoryTab'
import ToggleDrawer from 'components/Header/ToggleDrawer'
import CollectionImage2 from 'assets/images/nft-collection-2.png'
import CollectionImage3 from 'assets/images/nft-collection-3.png'
import CollectionImage4 from 'assets/images/nft-collection-4.png'
import AppBar from 'components/AppBar'
import CurrencyDropdown from 'components/Dropdowns/CurrencyDropdown'
import AppBody from '../AppBody'
import TabPanel from 'components/tab/TabPanel'
import { CustomCard } from './components/Card'
import { AutoColumn } from 'components/Column'
import { ResponsiveRow } from 'components/Row'
import { BodyScroller, CurrencySelectWrapper, Disclaimer } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { getPoolsData } from 'components/Table/sample-pools'
// SVGs
import WalletSvgSrc from '../../assets/svg/wallet.svg'
import PoolsSvgSrc from '../../assets/svg/pools.svg'
import YieldSvgSrc from '../../assets/svg/yield.svg'
import NFTsSvgSrc from '../../assets/svg/nfts.svg'
// HOOKS
import { useActiveWeb3React } from 'hooks/web3'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useCurrency } from 'hooks/Tokens'
import { useEthereumToBaseCurrencyRatesAndApiState } from 'state/user/hooks'
import { getTokensData } from 'components/Table/sample-tokens'
import BuySection from './BuySection'

const StyledAppBar = styled(AppBar)`
  padding: 0px 2rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 0px 0.625rem;
  `}
`

const SampleNFTData = [
  {
    src: CollectionImage4,
    title: 'Anrgy Nahfrog',
    value: 80.1,
  },
  {
    src: CollectionImage2,
    title: 'Latency Slap',
    value: 45.1,
  },
  {
    src: CollectionImage3,
    title: 'Rich Nahfrog',
    value: 10.6,
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const { state } = useLocation<any>()
  const { account } = useActiveWeb3React()
  const { ethereumToBaseCurrencyRates: rates } = useEthereumToBaseCurrencyRatesAndApiState()
  const inputCurrency = useCurrency('ETH')
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency ?? undefined)
  const balanceValue = balance && rates['USD'] ? Number(formatCurrencyAmount(balance, 4)) * rates['USD'] : 0

  const newPools = useMemo(() => {
    return getPoolsData('new', 3)
  }, [])

  const sampleTokens = useMemo(() => {
    return getTokensData(3)
  }, [])
  // TODO: implement more flexible solution
  useEffect(() => {
    if (!state?.activeTab) {
      return
    }

    setActiveTab(state.activeTab)

    const scrollTo = setTimeout(() => document.querySelector('#history')?.scrollIntoView({ behavior: 'smooth' }))
    return () => {
      clearTimeout(scrollTo)
    }
  }, [state])

  const TabChangeHandler: any = (e: any, newValue: any) => setActiveTab(newValue)

  return (
    <>
      <StyledAppBar>
        <ToggleDrawer />
        <Tabs value={activeTab} onChange={TabChangeHandler}>
          <Tab key={`tab-0`} label={`Overview`} />
          <Tab key={`tab-1`} label={`History`} />
        </Tabs>
        <CurrencySelectWrapper>
          <CurrencyDropdown />
        </CurrencySelectWrapper>
      </StyledAppBar>
      <BodyScroller>
        <TabPanel key={'tab-panel-0'} activeIndex={activeTab} index={0}>
          <Disclaimer style={{ marginBottom: '10px' }}>
            <span>Disclaimer:</span>
            {` `}
            {t`This is Dummy Data`}
          </Disclaimer>
          <AutoColumn gap="lg">
            <ResponsiveRow>
              <AppBody size="lg" style={{ padding: '1.5rem' }}>
                <BuySection account={account} balanceValue={balanceValue} />
              </AppBody>
            </ResponsiveRow>
            <ResponsiveRow gap="2rem">
              <AppBody size="md">
                <CustomCard balance={balanceValue} svgIconSrc={WalletSvgSrc} data={sampleTokens} titleName={'Wallet'} />
              </AppBody>
              <AppBody size="md">
                {/* TODO: add valid balance */}
                <CustomCard
                  balance={balanceValue}
                  svgIconSrc={PoolsSvgSrc}
                  data={newPools}
                  titleName={'Liquidity Pools'}
                />
              </AppBody>
            </ResponsiveRow>
            <ResponsiveRow gap="2rem">
              <AppBody size="md">
                <CustomCard
                  balance={balanceValue}
                  svgIconSrc={YieldSvgSrc}
                  data={newPools}
                  titleName={'Yield Farming'}
                />
              </AppBody>
              <AppBody size="md">
                <CustomCard balance={balanceValue} svgIconSrc={NFTsSvgSrc} data={SampleNFTData} titleName={'NFTs'} />
              </AppBody>
            </ResponsiveRow>
          </AutoColumn>
        </TabPanel>
        <TabPanel key={'tab-panel-1'} activeIndex={activeTab} index={1}>
          <AutoColumn gap="lg">
            <ResponsiveRow id="history">
              <DashboardHistoryTab />
            </ResponsiveRow>
          </AutoColumn>
        </TabPanel>
      </BodyScroller>
    </>
  )
}
