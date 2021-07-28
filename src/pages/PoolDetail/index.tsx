import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import { Trans, t } from '@lingui/macro'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import CreatePoolButton from 'components/pools/CreatePoolButton'
import AppBar from 'components/AppBar'
import AppBody, { BodyWrapper } from '../AppBody'
import { AutoColumn } from 'components/Column'
import { BodyPanel } from '../styled'
import PoolDetailChart from 'components/LineChart/PoolDetail'
import { BodyScroller, TYPE, BarWrapper, BarTitle } from 'theme'
import { usePoolInvestModalToggle } from 'state/application/hooks'
import PoolInvest from 'components/PoolInvest'
import PoolWithdraw from 'components/PoolWithdraw'
import PoolInvestModal from 'components/PoolInvestModal'
import CurrencyAvatar from 'components/CurrencyAvatar'
import TokenDetails from './TokenDetails'
import ROISimulator from './ROISimulator'
import Tab from '../../components/tab/Tab'
import Tabs from '../../components/tab/Tabs'
import TabPanel from '../../components/tab/TabPanel'

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

const ButtonWrapper = styled.div`
  display: flex;
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
  padding: 1rem 2rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    gap: 1rem;
  `}
`

const PoolDetailAppBodyWrap = styled(AppBody)`
  padding: 2rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 1rem;
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
export default function PoolDetails({
  match: {
    params: { token0, token1 },
  },
}: RouteComponentProps<{ token0: string; token1: string }>) {
  const [activeTab, setActiveTab] = useState<number>(0)
  const togglePoolInvestModal = usePoolInvestModalToggle()
  const history = useHistory()
  const TabChangeHandler: any = (e: any, newValue: any) => setActiveTab(newValue)
  if (!token0 || !token1) {
    return <Redirect to={'/swap'} />
  }
  return (
    <>
      <AppBar style={{ padding: '0 1rem' }}>
        <BarWrapper>
          <BarTitle>
            <ArrowLeft style={{ cursor: 'pointer' }} onClick={() => history.push('/pools')} />
            {`${token0} / ${token1} `}
            {t`Pool`}
          </BarTitle>
          <ButtonWrapper>
            <CreatePoolButton />
          </ButtonWrapper>
        </BarWrapper>
      </AppBar>
      <BodyScroller>
        <BodyPanel>
          <Wrapper>
            <RowColumn>
              <AppBody size="md" style={{ minHeight: '440px' }}>
                <Tabs value={activeTab} onChange={TabChangeHandler}>
                  <Tab
                    key={`tab-0`}
                    label={t`Invest`}
                    style={{ backgroundColor: 'transparent', minWidth: '50%', paddingRight: '0px', marginRight: '0px' }}
                    wrapperStyles={{
                      root: {
                        backgroundColor: 'transparent',
                        fontWeight: 500,
                        borderBottomColor: '#C9F0ED',
                        borderBottomWidth: '1px',
                        borderBottomStyle: 'solid',
                      },
                      hover: {
                        backgroundColor: 'transparent',
                        fontWeight: 500,
                        borderRadius: '0px',
                        borderBottomColor: '#9871F9',
                      },
                      selected: {
                        backgroundColor: 'transparent',
                        fontWeight: 500,
                        borderBottomColor: '#9871F9',
                        borderRadius: '0px',
                      },
                    }}
                  />
                  <Tab
                    key={`tab-1`}
                    label={t`Widthdraw`}
                    style={{ backgroundColor: 'transparent', minWidth: '50%', paddingLeft: '0px', marginLeft: '0px' }}
                    wrapperStyles={{
                      root: {
                        backgroundColor: 'transparent',
                        fontWeight: 500,
                        borderBottomColor: '#C9F0ED',
                        borderBottomWidth: '1px',
                        borderBottomStyle: 'solid',
                      },
                      hover: {
                        backgroundColor: 'transparent',
                        fontWeight: 500,
                        borderRadius: '0px',
                        borderBottomColor: '#9871F9',
                      },
                      selected: {
                        backgroundColor: 'transparent',
                        fontWeight: 500,
                        borderBottomColor: '#9871F9',
                        borderRadius: '0px',
                      },
                    }}
                  />
                </Tabs>
                <TabPanel key={'tab-panel-0'} activeIndex={activeTab} index={0}>
                  <PoolInvest />
                </TabPanel>
                <TabPanel key={'tab-panel-1'} activeIndex={activeTab} index={1}>
                  <PoolWithdraw />
                </TabPanel>
              </AppBody>
              <AppBody size="md" style={{ minHeight: '440px' }}>
                <PoolDetailChartWrapper>
                  <PoolDetailChart token0={token0} token1={token1} />
                </PoolDetailChartWrapper>
              </AppBody>
            </RowColumn>
            <RowColumn>
              <TokenStatsWrapper>
                <TYPE.mediumHeaderEllipsis marginBottom={'1rem'}>
                  <Trans>Token Stats</Trans>
                </TYPE.mediumHeaderEllipsis>
                <PoolCardRowColumn>
                  <PoolCardItem style={{ width: '100%' }}>
                    <CurrencyAvatar
                      symbol={'ETH'}
                      containerStyle={{ padding: '0.3125rem' }}
                      rootStyle={{ marginBottom: '1rem' }}
                    />
                    <TokenDetails />
                  </PoolCardItem>
                  <PoolCardItem style={{ width: '100%' }}>
                    <CurrencyAvatar symbol={'NII'} rootStyle={{ marginBottom: '1rem' }} />
                    <TokenDetails />
                  </PoolCardItem>
                </PoolCardRowColumn>
              </TokenStatsWrapper>
              <ROISimulatorWrapper>
                <TYPE.mediumHeaderEllipsis marginBottom={'1rem'}>
                  <Trans>ROI Simulator</Trans>
                </TYPE.mediumHeaderEllipsis>
                <ROISimulator token0={token0} token1={token1} />
              </ROISimulatorWrapper>
            </RowColumn>
          </Wrapper>
        </BodyPanel>
      </BodyScroller>
    </>
  )
}
