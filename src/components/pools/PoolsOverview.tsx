import React, { CSSProperties } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { t, Trans } from '@lingui/macro'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { NIILogo } from 'components/Icons'
import { FlexColumn } from 'components/Column'
import { DefaultCard } from 'components/Card'
import { ButtonOutlined } from 'components/Button'
import { PoolTypes, useApiPools } from 'hooks/useApi'
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
    case 'gainers':
      return t`Top Gainer Pools`
    case 'losers':
      return t`Top Loser Pools`
  }

  return t`New Pools`
}

type PoolsOverviewProps = {
  type: PoolTypes
  id?: string
  limit?: number
  style?: CSSProperties
}

export default function PoolsOverview({ type, id, limit, style }: PoolsOverviewProps) {
  const isSmallScreen = useBreakpoint(MEDIA_WIDTHS.upToSmall)
  const history = useHistory()

  const { data, loader } = useApiPools(type, limit)

  const handleCardOnClick = (e: any, id: string) => {
    e.preventDefault()
    history.push(`/pool/${id}`)
  }

  return (
    <>
      <FlexColumn id={id} style={style}>
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
        {loader ||
          (data &&
            Object.entries(data.slice(0, 6)).map(([key, item]) => {
              return (
                <Grid item xs={isSmallScreen ? 12 : 4} key={key}>
                  <Card onClick={(e) => handleCardOnClick(e, item.address)}>
                    <RowWrapper style={{ justifyContent: 'space-between' }}>
                      <RowWrapper>
                        <div style={{ position: 'relative' }}>
                          <CurrencyAvatar
                            symbol=""
                            address={item.token1.address}
                            iconProps={{ width: '32', height: '32' }}
                            containerStyle={{ zIndex: 1 }}
                            hideSymbol={true}
                          />
                          <CurrencyAvatar
                            symbol=""
                            address={item.token2.address}
                            iconProps={{ width: '32', height: '32' }}
                            containerStyle={{ left: '22px', position: 'absolute', marginTop: '-34px' }}
                            hideSymbol={true}
                          />
                          <CircleWrapper style={{ left: '46px', position: 'absolute', marginTop: '-36px' }}>
                            <NIILogo id="poolsNiiLogo" />
                          </CircleWrapper>
                        </div>
                        <ColumnWrapper style={{ marginLeft: '32px' }}>
                          <TYPE.mediumHeader>
                            {item.token1.symbol} / {item.token2.symbol}
                          </TYPE.mediumHeader>
                          <TYPE.subHeader color={'text2'}>NiiFi</TYPE.subHeader>
                        </ColumnWrapper>
                      </RowWrapper>
                      <RowWrapper>
                        <ButtonOutlined>
                          <Trans>Add Liquidity</Trans>
                        </ButtonOutlined>
                      </RowWrapper>
                    </RowWrapper>
                    <FlexColumn style={{ padding: '18px 0 0 0' }}>
                      <div>
                        <TYPE.subHeader color={'text1'}>
                          <Trans>TVL</Trans>
                        </TYPE.subHeader>
                        <TYPE.mediumHeader fontSize="16" paddingTop="5px">
                          <BaseCurrencyView type="symbol" value={Number(item.liquidity)} />
                        </TYPE.mediumHeader>
                      </div>
                      <div>
                        <TYPE.subHeader color={'text1'}>
                          <Trans>APY</Trans>
                        </TYPE.subHeader>
                        <TYPE.mediumHeader fontSize="16" paddingTop="5px">
                          {shortenDecimalValues(item.apy)}
                        </TYPE.mediumHeader>
                      </div>{' '}
                      {/* <div>
                        <TYPE.subHeader color={'text1'}>
                          <Trans>Trending</Trans>
                        </TYPE.subHeader>
                        <TYPE.mediumHeader fontSize="16" paddingTop="5px">
                          {parseInt(item.trendingPercentY) > 0 && '+'}
                          {shortenDecimalValues(item.trendingPercentY, '0.[00]')}%
                        </TYPE.mediumHeader>
                      </div> */}
                    </FlexColumn>
                  </Card>
                </Grid>
              )
            }))}
      </Grid>
    </>
  )
}
