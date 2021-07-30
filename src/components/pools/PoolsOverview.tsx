import React, { CSSProperties, useMemo } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { t, Trans } from '@lingui/macro'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { NIILogo } from 'components/Icons'
import { FlexColumn } from 'components/Column'
import { DefaultCard } from 'components/Card'
import { getPoolsData } from 'components/Table/sample-pools'
import { usePoolInvestModalToggle } from 'state/application/hooks'
import PoolInvestModal from 'components/PoolInvestModal'
import InvestButton from 'components/pools/InvestButton'
import { shortenDecimalValues } from '../../utils'
import useBreakpoint from '../../hooks/useBreakpoint'
import { TYPE, RowWrapper, ColumnWrapper, CircleWrapper, MEDIA_WIDTHS, BaseCurrencyView } from 'theme'

const Header = styled(TYPE.mediumHeader)`
  padding: 0 0 10px 0;
`

const Link = styled(NavLink)`
  color: ${({ theme }) => theme.primary1};
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const Card = styled(DefaultCard)`
  padding: 2rem;
  cursor: pointer;
  button {
    width: auto;
    height: 30px;
    font-size: 12px;
    text-transform: uppercase;
    visibility: ${isMobile ? 'visible' : 'hidden'};
    padding: 0 16px;
  }
  &:hover {
    color: 'red';
    border-color: ${({ theme }) => theme.text2};
    button {
      visibility: visible;
    }
  }
`

export const getTitle = (type: string): string => {
  switch (type) {
    case 'gainer':
      return t`Top Gainer Pools`
    case 'looser':
      return t`Top Looser Pools`
  }

  return t`New Pools`
}

type PoolsOverviewProps = {
  type: 'gainer' | 'looser' | 'new'
  limit?: number
  style?: CSSProperties
}

export default function PoolsOverview({ type, limit, style }: PoolsOverviewProps) {
  const isSmallScreen = useBreakpoint(MEDIA_WIDTHS.upToSmall)
  const history = useHistory()
  const poolsData = useMemo(() => {
    return getPoolsData(type, limit)
  }, [type, limit])

  const toggleInvestModal = usePoolInvestModalToggle()

  const handleCardOnClick = (e: any) => {
    e.preventDefault()
    history.push('/pools/ETH/NII')
  }

  return (
    <>
      <FlexColumn style={style}>
        <Header>{getTitle(type)}</Header>
        <Link
          to={{
            pathname: `/pools/search?type=${type}`,
            state: { activeTab: 1, type },
          }}
        >
          <Trans>See all</Trans>
        </Link>
      </FlexColumn>
      <Grid container direction="row" alignItems="flex-start" spacing={3}>
        {Object.entries(poolsData).map(([key, item]) => {
          return (
            <Grid item xs={isSmallScreen ? 12 : 4} key={key}>
              <Card onClick={handleCardOnClick}>
                <RowWrapper style={{ justifyContent: 'space-between' }}>
                  <RowWrapper>
                    <div style={{ position: 'relative' }}>
                      <CurrencyAvatar
                        symbol={'ETH'}
                        iconProps={{ width: '32', height: '32' }}
                        containerStyle={{ zIndex: 1 }}
                        hideSymbol={true}
                      />
                      <CurrencyAvatar
                        symbol={'NII'}
                        iconProps={{ width: '32', height: '32', id: 'poolsNiiLogo' }}
                        containerStyle={{ left: '22px', position: 'absolute', marginTop: '-34px' }}
                        hideSymbol={true}
                      />
                      <CircleWrapper style={{ left: '46px', position: 'absolute', marginTop: '-36px' }}>
                        <NIILogo id="poolsNiiLogo" />
                      </CircleWrapper>
                    </div>
                    <ColumnWrapper style={{ marginLeft: '32px' }}>
                      <TYPE.mediumHeader>
                        {item.token0.symbol} / {item.token1.symbol}
                      </TYPE.mediumHeader>
                      <TYPE.subHeader color={'text2'}>NiiFi</TYPE.subHeader>
                    </ColumnWrapper>
                  </RowWrapper>
                  <RowWrapper>
                    <InvestButton
                      token0={{ symbol: 'ETH', address: '1234' }}
                      token1={{ symbol: 'NII', address: '1235' }}
                      type="outlined"
                      onClick={toggleInvestModal}
                    >
                      <Trans>Invest</Trans>
                    </InvestButton>
                  </RowWrapper>
                </RowWrapper>
                <FlexColumn style={{ padding: '18px 0 0 0' }}>
                  <div>
                    <TYPE.subHeader color={'text1'}>
                      <Trans>Liquidity</Trans>
                    </TYPE.subHeader>
                    <TYPE.mediumHeader fontSize="16" paddingTop="5px">
                      <BaseCurrencyView type="symbol" value={shortenDecimalValues(item.liquidity, '0.[00]a')} />
                    </TYPE.mediumHeader>
                  </div>
                  <div>
                    <TYPE.subHeader color={'text1'}>
                      <Trans>ROI (1Y)</Trans>
                    </TYPE.subHeader>
                    <TYPE.mediumHeader fontSize="16" paddingTop="5px">
                      {shortenDecimalValues(item.roiY, '0.[00]a')}
                    </TYPE.mediumHeader>
                  </div>{' '}
                  <div>
                    <TYPE.subHeader color={'text1'}>
                      <Trans>Trending</Trans>
                    </TYPE.subHeader>
                    <TYPE.mediumHeader fontSize="16" paddingTop="5px">
                      {parseInt(item.trendingPercent) > 0 && '+'}
                      {shortenDecimalValues(item.trendingPercent, '0.[00]')}%
                    </TYPE.mediumHeader>
                  </div>
                </FlexColumn>
              </Card>
            </Grid>
          )
        })}
      </Grid>
      <PoolInvestModal />
    </>
  )
}
