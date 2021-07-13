import React from 'react'
import styled from 'styled-components/macro'
import { ArrowLeft } from 'react-feather'
import { Trans, t } from '@lingui/macro'
import { RouteComponentProps, Redirect } from 'react-router-dom'

import { BodyScroller } from 'components/swap/styleds'
import AppBar from 'components/AppBar'
import { ButtonPrimary } from 'components/Button'
import AppBody, { BodyWrapper } from '../AppBody'
import { AutoColumn } from 'components/Column'
import { ResponsiveRow } from 'components/Row'
import { BodyPanel } from '../styled'
import PoolDetailChart from 'components/LineChart/PoolDetail'
import { TYPE } from 'theme'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { TextItemWrapper, TextValue, TextLabel } from './styled'
import TokenDetails, { MainCurrency } from './TokenDetails'

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
`
const BarWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0.5rem 1rem;
  `}
`
const BarTitle = styled.div`
  display: flex;
  gap: 1rem;
  align-item: center;
  font-size: 1.25rem;
  justify-content: flex-start;
  color: ${({ theme }) => theme.text1};
`
const ButtonWrapper = styled.div`
  display: flex;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
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
  `}
`
const PoolCardItem = styled(AutoColumn)<{ borderRight?: boolean; flex?: string }>`
  flex: ${({ flex }) => (flex ? flex : '')};
  border-right: ${({ theme, borderRight }) => (borderRight ? `1px solid ${theme.bg3}` : '')};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex: 1;
    border-right: none;
  `}
`
export default function PoolDetails({
  match: {
    params: { token0, token1 },
  },
}: RouteComponentProps<{ token0: string; token1: string }>) {
  if (!token0 || !token1) {
    return <Redirect to={'/swap'} />
  }
  return (
    <>
      <AppBar>
        <BarWrapper>
          <BarTitle>
            <ArrowLeft />
            {`${token0} / ${token1} `}
            {t`Pool`}
          </BarTitle>
          <ButtonWrapper>
            <ButtonPrimary style={{ fontSize: '14px' }} padding={'10px 14px'}>
              <Trans>Invest</Trans>
            </ButtonPrimary>
          </ButtonWrapper>
        </BarWrapper>
      </AppBar>
      <BodyScroller>
        <BodyPanel>
          <Wrapper>
            <AutoColumn>
              <ResponsiveRow>
                <PoolDetailAppBodyWrap size="lg">
                  <PoolCardRowColumn>
                    <PoolCardItem flex={'1'} borderRight style={{ width: '100%' }}>
                      <TYPE.mediumHeaderEllipsis>
                        {`${token0}-${token1} `}
                        <Trans> Pair Stats</Trans>
                      </TYPE.mediumHeaderEllipsis>
                      <TextItemWrapper>
                        <TextLabel>
                          <Trans>Liquidity</Trans>
                        </TextLabel>
                        <TextValue>768.867 {MainCurrency}</TextValue>
                      </TextItemWrapper>
                      <TextItemWrapper>
                        <TextLabel>
                          <Trans>Volume</Trans>
                        </TextLabel>
                        <TextValue>677.430 {MainCurrency}</TextValue>
                      </TextItemWrapper>
                      <TextItemWrapper>
                        <TextLabel>
                          <Trans>Fees</Trans>
                        </TextLabel>
                        <TextValue>2.032 {MainCurrency}</TextValue>
                      </TextItemWrapper>
                    </PoolCardItem>
                    <PoolCardItem flex={'2'} style={{ width: '100%' }}>
                      <PoolDetailChart />
                    </PoolCardItem>
                  </PoolCardRowColumn>
                </PoolDetailAppBodyWrap>
              </ResponsiveRow>
            </AutoColumn>
            <AutoColumn>
              <RowColumn>
                <TokenStatsWrapper>
                  <TYPE.mediumHeaderEllipsis marginBottom={'1rem'}>
                    <Trans>Token Stats</Trans>
                  </TYPE.mediumHeaderEllipsis>
                  <PoolCardRowColumn>
                    <PoolCardItem flex={'1'} borderRight style={{ width: '100%' }}>
                      <CurrencyAvatar
                        symbol={'ETH'}
                        containerStyle={{ padding: '0.3125rem' }}
                        rootStyle={{ marginBottom: '1rem' }}
                      />
                      <TokenDetails />
                    </PoolCardItem>
                    <PoolCardItem flex={'1'} style={{ width: '100%' }}>
                      <CurrencyAvatar symbol={'NII'} rootStyle={{ marginBottom: '1rem' }} />
                      <TokenDetails />
                    </PoolCardItem>
                  </PoolCardRowColumn>
                </TokenStatsWrapper>
                <ROISimulatorWrapper>
                  <TYPE.mediumHeaderEllipsis marginBottom={'1rem'}>
                    <Trans>ROI Simulator</Trans>
                  </TYPE.mediumHeaderEllipsis>
                </ROISimulatorWrapper>
              </RowColumn>
            </AutoColumn>
          </Wrapper>
        </BodyPanel>
      </BodyScroller>
    </>
  )
}
