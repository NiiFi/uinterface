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

const TokenStatsWrapper = styled(BodyWrapper)`
  flex: 2;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
  `};
`
const ROISimulatorWrapper = styled(BodyWrapper)`
  flex: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
  `};
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
                <AppBody size="lg">
                  <PoolDetailChart />
                </AppBody>
              </ResponsiveRow>
            </AutoColumn>
            <AutoColumn>
              <RowColumn>
                <TokenStatsWrapper>
                  <h1>Token Stats Wrapper</h1>
                </TokenStatsWrapper>
                <ROISimulatorWrapper>
                  <h1>ROI Wrapper</h1>
                </ROISimulatorWrapper>
              </RowColumn>
            </AutoColumn>
          </Wrapper>
        </BodyPanel>
      </BodyScroller>
    </>
  )
}
