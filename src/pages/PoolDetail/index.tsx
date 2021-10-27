import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import { Trans, t } from '@lingui/macro'
import { RouteComponentProps } from 'react-router-dom'
import CreatePoolButton from 'components/pools/CreatePoolButton'
import { PoolAppBar } from 'pages/Pool/styleds'
import AppBody, { BodyWrapper } from '../AppBody'
import { AutoColumn } from 'components/Column'
import { ResponsiveRow } from 'components/Row'
import { BodyPanel } from '../styled'
import PoolDetailChart from 'components/LineChart/PoolDetail'
import { BodyScroller, TYPE, BarTitle, CurrencySelectWrapper } from 'theme'
import PoolInvest from 'components/PoolInvest'
import PoolWithdraw from 'components/PoolWithdraw'
import CurrencyDropdown from 'components/Dropdowns/CurrencyDropdown'
import CurrencyAvatar from 'components/CurrencyAvatar'
import TokenDetails from './TokenDetails'
import ROISimulator from './ROISimulator'
import Tab from '../../components/tab/Tab'
import Tabs from '../../components/tab/Tabs'
import TabPanel from '../../components/tab/TabPanel'
import useTheme from '../../hooks/useTheme'
import { useCurrency } from 'hooks/Tokens'
// TODO: remove usePoolDatas and all thegraph usage
// import { usePoolDatas } from 'state/pools/hooks'
import { useApiPoolsDetail } from 'hooks/useApi'
import { useIsDarkMode } from 'state/user/hooks'
import MaintenanceBackgroundLight from '../../assets/images/comingsoon-tile-light.png'
import MaintenanceBackgroundDark from '../../assets/images/comingsoon-tile-dark.png'

const TokenStatsWrapper = styled(BodyWrapper)`
  flex: 2;
  padding: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 1rem;
  `}
`
const ROISimulatorWrapper = styled(BodyWrapper)`
  flex: 1;
  padding: 2rem;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 48%;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    padding: 1rem;
  `}
`
const RowColumn = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    gap: 1rem;
  `}
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    gap: 1rem;
  `}
`

const PoolDetailChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 2rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    gap: 1rem;
  `}
`

const PoolCardRowColumn = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 1rem;
  `}
`
const PoolCardItem = styled(AutoColumn)`
  :nth-child(1) {
    border-right: 1px solid ${({ theme }) => theme.bg3};
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    :nth-child(1) {
      border-right: none;
      border-bottom: 1px solid ${({ theme }) => theme.bg3};
    }
  `}
`

const rootStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  fontWeight: 500,
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
}

const selectedStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  fontWeight: 500,
  borderRadius: '0px',
}

const wrapperStyle = {
  root: rootStyle,
  hover: selectedStyle,
  selected: selectedStyle,
}

export default function PoolDetails({
  match: {
    params: { address },
  },
}: RouteComponentProps<{ address: string }>) {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [token0, setToken0] = useState()
  const [token1, setToken1] = useState()
  const history = useHistory()
  const theme = useTheme()
  const darkMode = useIsDarkMode()
  wrapperStyle.root.borderBottomColor = theme.bg3
  wrapperStyle.hover.borderBottomColor = theme.primary1
  wrapperStyle.selected.borderBottomColor = theme.primary1

  const { data: poolData, loader } = useApiPoolsDetail(address)

  useEffect(() => {
    if (!poolData) return
    setToken0(poolData?.token1?.address)
    setToken1(poolData?.token2?.address)
  }, [poolData])

  const currency0 = useCurrency(token0, poolData?.token1)
  const currency1 = useCurrency(token1, poolData?.token2)

  const TabChangeHandler: any = (e: any, newValue: any) => setActiveTab(newValue)

  return (
    <>
      {loader ||
        (poolData && (
          <>
            <PoolAppBar>
              <BarTitle>
                <ArrowLeft style={{ cursor: 'pointer' }} onClick={history.goBack} />
                {poolData.token1.symbol} / {poolData.token2.symbol} {t`Pool`}
              </BarTitle>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CreatePoolButton />
                <CurrencySelectWrapper>
                  <CurrencyDropdown />
                </CurrencySelectWrapper>
              </div>
            </PoolAppBar>
            <BodyScroller>
              <BodyPanel>
                <Wrapper>
                  <ResponsiveRow>
                    <AppBody size="md" style={{ minHeight: '440px' }}>
                      <Tabs value={activeTab} onChange={TabChangeHandler}>
                        <Tab
                          key={`tab-0`}
                          label={t`Liquidity`}
                          style={{
                            backgroundColor: 'transparent',
                            minWidth: '50%',
                            paddingRight: '0px',
                            marginRight: '0px',
                          }}
                          wrapperStyles={wrapperStyle}
                        />
                        <Tab
                          key={`tab-1`}
                          label={t`Withdraw`}
                          style={{
                            backgroundColor: 'transparent',
                            minWidth: '50%',
                            paddingLeft: '0px',
                            marginLeft: '0px',
                          }}
                          wrapperStyles={wrapperStyle}
                        />
                      </Tabs>
                      <TabPanel key={'tab-panel-0'} activeIndex={activeTab} index={0}>
                        {currency0 && currency1 && <PoolInvest currency0={currency0} currency1={currency1} />}
                      </TabPanel>
                      <TabPanel key={'tab-panel-1'} activeIndex={activeTab} index={1}>
                        {currency0 && currency1 && <PoolWithdraw currency0={currency0} currency1={currency1} />}
                      </TabPanel>
                    </AppBody>
                    <AppBody
                      size="md"
                      style={{
                        minHeight: '440px',
                        backgroundImage: `url(${darkMode ? MaintenanceBackgroundDark : MaintenanceBackgroundLight})`,
                        backgroundSize: '200px',
                      }}
                    >
                      <PoolDetailChartWrapper>
                        <PoolDetailChart
                          address={poolData.address}
                          token0={poolData.token1.symbol}
                          token1={poolData.token2.symbol}
                        />
                      </PoolDetailChartWrapper>
                    </AppBody>
                  </ResponsiveRow>
                  <RowColumn>
                    <TokenStatsWrapper>
                      <TYPE.mediumHeaderEllipsis marginBottom={'1rem'}>
                        <Trans>Token Stats</Trans>
                      </TYPE.mediumHeaderEllipsis>
                      <PoolCardRowColumn>
                        <PoolCardItem style={{ width: '100%' }}>
                          <CurrencyAvatar
                            symbol={poolData.token1.symbol}
                            address={poolData.token1.address}
                            rootStyle={{ marginBottom: '1rem' }}
                            iconProps={{ width: '30', height: '30' }}
                          />
                          <TokenDetails token={poolData.token1} />
                        </PoolCardItem>
                        <PoolCardItem style={{ width: '100%' }}>
                          <CurrencyAvatar
                            symbol={poolData.token2.symbol}
                            address={poolData.token2.address}
                            rootStyle={{ marginBottom: '1rem' }}
                            iconProps={{ width: '30', height: '30' }}
                          />
                          <TokenDetails token={poolData.token2} />
                        </PoolCardItem>
                      </PoolCardRowColumn>
                    </TokenStatsWrapper>
                    <ROISimulatorWrapper
                      style={{
                        backgroundImage: `url(${darkMode ? MaintenanceBackgroundDark : MaintenanceBackgroundLight})`,
                        backgroundSize: '200px',
                      }}
                    >
                      <TYPE.mediumHeaderEllipsis marginBottom={'1rem'}>
                        <Trans>ROI Simulator</Trans>
                      </TYPE.mediumHeaderEllipsis>
                      {currency0 && currency1 && <ROISimulator currency0={currency0} currency1={currency1} />}
                    </ROISimulatorWrapper>
                  </RowColumn>
                </Wrapper>
              </BodyPanel>
            </BodyScroller>
          </>
        ))}
    </>
  )
}
