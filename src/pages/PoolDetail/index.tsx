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
import { BodyScroller, TYPE, BarTitle, CurrencySelectWrapper, Dots } from 'theme'
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
import { usePoolDatas } from 'state/pools/hooks'
import { Text } from 'rebass'

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
  wrapperStyle.root.borderBottomColor = theme.bg3
  wrapperStyle.hover.borderBottomColor = theme.primary1
  wrapperStyle.selected.borderBottomColor = theme.primary1

  const poolData = usePoolDatas([address])
  useEffect(() => {
    if (poolData?.[0]?.token0 === undefined || poolData?.[0]?.token1 === undefined) return
    setToken0(poolData[0].token0.id)
    setToken1(poolData[0].token1.id)
  }, [poolData])

  const currency0 = useCurrency(token0, poolData?.[0]?.token0) || poolData?.[0]?.token0
  const currency1 = useCurrency(token1, poolData?.[0]?.token1) || poolData?.[0]?.token1

  const { symbol: currency0Symbol } = currency0 || { symbol: poolData?.[0]?.token0?.symbol }
  const { symbol: currency1Symbol } = currency1 || { symbol: poolData?.[0]?.token1?.symbol }

  const TabChangeHandler: any = (e: any, newValue: any) => setActiveTab(newValue)

  return (
    <>
      <PoolAppBar>
        <BarTitle>
          <ArrowLeft style={{ cursor: 'pointer' }} onClick={history.goBack} />
          {`${currency0Symbol || '-'} / ${currency1Symbol || '-'} `}
          {t`Pool`}
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
          {!currency0Symbol || !currency1Symbol ? (
            <AutoColumn gap="sm" justify="center">
              <Text textAlign="center">
                <Trans>Loading</Trans>
                <Dots />
              </Text>
            </AutoColumn>
          ) : (
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
                      style={{ backgroundColor: 'transparent', minWidth: '50%', paddingLeft: '0px', marginLeft: '0px' }}
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
                <AppBody size="md" style={{ minHeight: '440px' }}>
                  <PoolDetailChartWrapper>
                    <PoolDetailChart token0={currency0Symbol} token1={currency1Symbol} />
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
                      {currency0 && (
                        <CurrencyAvatar
                          symbol={currency0Symbol}
                          currency={currency0}
                          rootStyle={{ marginBottom: '1rem' }}
                        />
                      )}
                      {token0 && <TokenDetails token={poolData[0].token0} />}
                    </PoolCardItem>
                    <PoolCardItem style={{ width: '100%' }}>
                      {currency1 && (
                        <CurrencyAvatar
                          symbol={currency1Symbol}
                          currency={currency1}
                          rootStyle={{ marginBottom: '1rem' }}
                        />
                      )}
                      {token1 && <TokenDetails token={poolData[0].token1} />}
                    </PoolCardItem>
                  </PoolCardRowColumn>
                </TokenStatsWrapper>
                <ROISimulatorWrapper>
                  <TYPE.mediumHeaderEllipsis marginBottom={'1rem'}>
                    <Trans>ROI Simulator</Trans>
                  </TYPE.mediumHeaderEllipsis>
                  {currency0 && currency1 && <ROISimulator currency0={currency0} currency1={currency1} />}
                </ROISimulatorWrapper>
              </RowColumn>
            </Wrapper>
          )}
        </BodyPanel>
      </BodyScroller>
    </>
  )
}
