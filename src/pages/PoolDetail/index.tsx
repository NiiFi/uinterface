import React from 'react'
import styled from 'styled-components/macro'
import { ArrowLeft } from 'react-feather'
import { Trans, t } from '@lingui/macro'
import { RouteComponentProps, Redirect } from 'react-router-dom'

import { BodyScroller } from 'components/swap/styleds'
import AppBar from 'components/AppBar'
import InvestButton from 'components/pools/InvestButton'
import AppBody, { BodyWrapper } from '../AppBody'
import { AutoColumn } from 'components/Column'
import { BodyPanel } from '../styled'
import PoolDetailChart from 'components/LineChart/PoolDetail'
import { TYPE } from 'theme'
import CurrencyAvatar from 'components/CurrencyAvatar'
import TokenDetails from './TokenDetails'
import ROISimulator from './ROISimulator'

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
            <InvestButton
              token0={{ symbol: token0, address: '1234' }}
              token1={{ symbol: token1, address: '1235' }}
              type="primary"
              style={{ fontSize: '14px' }}
              padding={'10px 14px'}
            >
              <Trans>Invest</Trans>
            </InvestButton>
          </ButtonWrapper>
        </BarWrapper>
      </AppBar>
      <BodyScroller>
        <BodyPanel>
          <Wrapper>
            <PoolDetailAppBodyWrap size="lg">
              <PoolDetailChart token0={token0} token1={token1} />
            </PoolDetailAppBodyWrap>
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