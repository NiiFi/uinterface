import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import ReactDOMServer from 'react-dom/server'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { Trans, t } from '@lingui/macro'
import ToggleDrawer from '../../components/Header/ToggleDrawer'
import CurrencyDropdown from 'components/Dropdowns/CurrencyDropdown'
import AppBar from 'components/AppBar'
import { DefaultCard } from 'components/Card'
import SimpleTable from 'components/Table/Simple'
import { ArrowDownIcon, ArrowUpIcon, BoxIcon, GearIcon, NIILogo } from 'components/Icons'
import { IconProps } from 'components/Icons/types'
import useTheme from 'hooks/useTheme'
import useBreakpoint from 'hooks/useBreakpoint'
import {
  BodyScroller,
  CurrencySelectWrapper,
  TYPE,
  MEDIA_WIDTHS,
  Disclaimer,
  BaseCurrencyView,
  RowWrapper,
  ColumnWrapper,
  CircleWrapper,
} from 'theme'
import { RowBetween } from 'components/Row'
import { BodyPanel } from '../styled'
import { WEB_API_BASE } from 'constants/general'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import CurrencyAvatar from 'components/CurrencyAvatar'
import Percent from 'components/Percent'
import useLazyFetch from 'hooks/useLazyFetch'

const Card = styled(DefaultCard)`
  padding: 0;
`
// TODO: move to shared component
export const CustomAppBar = styled(AppBar)`
  padding: 0px 2rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0.5rem 1rem;
  `}
`
// TODO: Move to shared component
const CardHeader = styled.div`
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 34px;
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding-left: 20px;
  `}
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

const LinkWrapper = styled.div`
  text-align: center;
  padding: 20px;
`

export function ArrowUpIconsGrouped(props: IconProps) {
  const { width, height, style } = props
  const encodedArrow = encodeURIComponent(ReactDOMServer.renderToStaticMarkup(ArrowUpIcon({ ...props })))
  const customStyles = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundImage: `url('data:image/svg+xml;utf8,${encodedArrow}'), url('data:image/svg+xml;utf8,${encodedArrow}'), url('data:image/svg+xml;utf8,${encodedArrow}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '18px 78px, 50px 36px, 74px 22px',
    backgroundSize: '48px 50px, 30px 32px, 118px 124px',
  }
  return <div style={{ ...customStyles, ...style }}></div>
}

export function ArrowDownIconsGrouped(props: IconProps) {
  const { width, height, style } = props
  const encodedArrow = encodeURIComponent(ReactDOMServer.renderToStaticMarkup(ArrowDownIcon({ ...props })))
  const customStyles = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundImage: `url('data:image/svg+xml;utf8,${encodedArrow}'), url('data:image/svg+xml;utf8,${encodedArrow}'), url('data:image/svg+xml;utf8,${encodedArrow}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '16px -4px, 48px 55px, 76px -25px',
    backgroundSize: '48px 50px, 30px 32px, 122px 128px',
  }
  return <div style={{ ...customStyles, ...style }}></div>
}

export function BoxIconsGrouped(props: IconProps) {
  const { width, height, style } = props
  const encodedBox = encodeURIComponent(ReactDOMServer.renderToStaticMarkup(BoxIcon({ ...props })))
  const customStyles = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundImage: `url('data:image/svg+xml;utf8,${encodedBox}'), url('data:image/svg+xml;utf8,${encodedBox}'), url('data:image/svg+xml;utf8,${encodedBox}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '18px 72px, 40px 31px, 74px 26px',
    backgroundSize: '36px 42px, 28px 32px, 116px 133px',
  }
  return <div style={{ ...customStyles, ...style }}></div>
}

export function GearIconsGrouped(props: IconProps) {
  const { width, height, style } = props
  const encodedBox = encodeURIComponent(ReactDOMServer.renderToStaticMarkup(GearIcon({ ...props })))
  const customStyles = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundImage: `url('data:image/svg+xml;utf8,${encodedBox}'), url('data:image/svg+xml;utf8,${encodedBox}'), url('data:image/svg+xml;utf8,${encodedBox}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0px 54px, 24px 25px, 50px 14px',
    backgroundSize: '41px 60px, 28px 40px, 122px 124px',
  }
  return <div style={{ ...customStyles, ...style }}></div>
}

export default function Discover() {
  const theme = useTheme()
  const history = useHistory()
  const isSmallScreen = useBreakpoint(MEDIA_WIDTHS.upToSmall)

  const [gainersFetch, { data: gainersData, error: gainersError, loading: gainersLoading }] = useLazyFetch<any[]>(
    `${WEB_API_BASE}tokens/gainers`
  )

  const [losersFetch, { data: losersData, error: losersError, loading: losersLoading }] = useLazyFetch<any[]>(
    `${WEB_API_BASE}tokens/losers`
  )

  const [newPoolsFetch, { data: newPoolsData, error: newPoolsError, loading: newPoolsLoading }] = useLazyFetch<any[]>(
    `${WEB_API_BASE}pools/new` // set limit to 3 items
  )

  useEffect(() => {
    gainersFetch()
  }, [gainersFetch])

  useEffect(() => {
    losersFetch()
  }, [losersFetch])

  useEffect(() => {
    newPoolsFetch()
  }, [newPoolsFetch])

  // const newData = useMemo(() => {
  //   return getPoolsData('new', 3)
  // }, [])

  const rowCellStyles = {
    color: theme.black,
    borderBottom: `1px solid ${theme.bg3}`,
    fontSize: '16px',
    padding: '6px 16px',
  }

  return (
    <>
      <CustomAppBar>
        <RowBetween>
          <ToggleDrawer />
        </RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CurrencySelectWrapper>
            <CurrencyDropdown />
          </CurrencySelectWrapper>
        </div>
      </CustomAppBar>
      <BodyScroller>
        <BodyPanel>
          <Disclaimer style={{ marginBottom: '24px' }}>
            <span>Disclaimer:</span>
            {` `}
            {t`This is Dummy Data`}
          </Disclaimer>
          <Grid container direction="row" alignItems="flex-start" spacing={3}>
            <Grid item xs={isSmallScreen ? 12 : 6}>
              <Card>
                <CardHeader>
                  <div>
                    <TYPE.body>
                      <Trans>Trending tokens</Trans>
                    </TYPE.body>
                    <TYPE.largeHeader fontWeight={400} lineHeight="2.250rem">
                      <Trans>Top Gainers</Trans>
                    </TYPE.largeHeader>
                  </div>
                  <ArrowUpIconsGrouped
                    width="200"
                    height="120"
                    color={theme.green2}
                    style={{ marginRight: isSmallScreen ? '0' : '20px' }}
                  />
                </CardHeader>
                {gainersData && (
                  <SimpleTable
                    data={gainersData}
                    row={(row, index) => {
                      const amount = row.priceUSD
                      const currencyFormat = amount > 9999 ? '0.[00]a' : '0,0'
                      return (
                        <TableRow hover role="checkbox" aria-checked={false} tabIndex={-1} key={index} selected={false}>
                          <TableCell
                            style={{ ...rowCellStyles, paddingLeft: isSmallScreen ? '18px' : '34px', paddingRight: 0 }}
                            align="center"
                          >
                            #{index + 1}
                          </TableCell>
                          <TableCell style={{ ...rowCellStyles, width: '42%' }} align="left">
                            <RowWrapper>
                              <CurrencyAvatar
                                symbol={row.symbol || 'ETH'}
                                address={row.address}
                                iconProps={{ width: '32', height: '32' }}
                                hideSymbol={true}
                              />
                              <TYPE.black style={{ padding: '8px 0 0 6px' }}>{row.symbol}</TYPE.black>
                            </RowWrapper>
                          </TableCell>
                          <TableCell style={{ ...rowCellStyles, width: '36%', padding: '6px 0' }} align="right">
                            <TYPE.body color={theme.text6} fontWeight={400} fontSize={14} lineHeight={1.4}>
                              <Trans>Price</Trans>
                            </TYPE.body>
                            <TYPE.mediumHeader>
                              {amount && !isNaN(amount) && (
                                <>
                                  {'≈'}
                                  <BaseCurrencyView type="symbol" value={amount} numeralFormat={currencyFormat} />
                                </>
                              )}
                            </TYPE.mediumHeader>
                          </TableCell>
                          <TableCell style={{ ...rowCellStyles, width: '20%' }} align="right">
                            <>{'\u00A0'}</>
                            <Percent value={row.priceUSDChange} decimals={0} fontWeight={500} />
                          </TableCell>
                        </TableRow>
                      )
                    }}
                  />
                )}
                <LinkWrapper>
                  <Link
                    to={{
                      pathname: '/swap',
                      state: { activeTab: 1, type: 'gainer' },
                    }}
                  >
                    <Trans>See all</Trans>
                  </Link>
                </LinkWrapper>
              </Card>
            </Grid>
            <Grid item xs={isSmallScreen ? 12 : 6}>
              <Card>
                <CardHeader>
                  <div>
                    <TYPE.body>
                      <Trans>Trending tokens</Trans>
                    </TYPE.body>
                    <TYPE.largeHeader fontWeight={400} lineHeight="2.250rem">
                      <Trans>Top Losers</Trans>
                    </TYPE.largeHeader>
                  </div>
                  <ArrowDownIconsGrouped
                    width="200"
                    height="120"
                    color={theme.red1}
                    style={{ marginRight: isSmallScreen ? '0' : '20px' }}
                  />
                </CardHeader>
                {losersData && (
                  <SimpleTable
                    data={losersData}
                    row={(row, index) => {
                      const amount = row.priceUSD
                      const currencyFormat = amount > 9999 ? '0.[00]a' : '0,0'
                      return (
                        <TableRow hover role="checkbox" aria-checked={false} tabIndex={-1} key={index} selected={false}>
                          <TableCell
                            style={{ ...rowCellStyles, paddingLeft: isSmallScreen ? '18px' : '34px', paddingRight: 0 }}
                            align="center"
                          >
                            #{index + 1}
                          </TableCell>
                          <TableCell style={{ ...rowCellStyles, width: '42%' }} align="left">
                            <RowWrapper>
                              <CurrencyAvatar
                                symbol={row.symbol || 'ETH'}
                                address={row.address}
                                iconProps={{ width: '32', height: '32' }}
                                hideSymbol={true}
                              />
                              <TYPE.black style={{ padding: '8px 0 0 6px' }}>{row.symbol}</TYPE.black>
                            </RowWrapper>
                          </TableCell>
                          <TableCell style={{ ...rowCellStyles, width: '36%', padding: '6px 0' }} align="right">
                            <TYPE.body color={theme.text6} fontWeight={400} fontSize={14} lineHeight={1.4}>
                              <Trans>Price</Trans>
                            </TYPE.body>
                            <TYPE.mediumHeader>
                              {amount && !isNaN(amount) && (
                                <>
                                  {'≈'}
                                  <BaseCurrencyView type="symbol" value={amount} numeralFormat={currencyFormat} />
                                </>
                              )}
                            </TYPE.mediumHeader>
                          </TableCell>
                          <TableCell style={{ ...rowCellStyles, width: '20%' }} align="right">
                            <>{'\u00A0'}</>
                            <Percent value={row.priceUSDChange} decimals={0} fontWeight={500} />
                          </TableCell>
                        </TableRow>
                      )
                    }}
                  />
                )}
                <LinkWrapper>
                  <Link
                    to={{
                      pathname: '/swap',
                      state: { activeTab: 1, type: 'looser' },
                    }}
                  >
                    <Trans>See all</Trans>
                  </Link>
                </LinkWrapper>
              </Card>
            </Grid>
            <Grid item xs={isSmallScreen ? 12 : 6}>
              <Card>
                <CardHeader>
                  <TYPE.largeHeader fontWeight={400}>
                    <Trans>New Pools</Trans>
                  </TYPE.largeHeader>
                  <BoxIconsGrouped
                    width="200"
                    height="120"
                    color={theme.orange1}
                    style={{ marginRight: isSmallScreen ? '0' : '20px' }}
                  />
                </CardHeader>
                {newPoolsData && (
                  <SimpleTable
                    data={newPoolsData.slice(0, 3)}
                    row={(row, index) => {
                      const amount = row.liquidity
                      const currencyFormat = amount > 9999 ? '0.[00]a' : '0,0'
                      return (
                        <TableRow hover role="checkbox" aria-checked={false} tabIndex={-1} key={index} selected={false}>
                          <TableCell
                            style={{
                              ...rowCellStyles,
                              paddingLeft: isSmallScreen ? '18px' : '34px',
                              cursor: 'pointer',
                            }}
                            align="left"
                            onClick={() => history.push(`/pool/${row.id}`)}
                          >
                            <RowWrapper>
                              <div style={{ position: 'relative' }}>
                                <CurrencyAvatar
                                  symbol=""
                                  address={row.token1Address}
                                  iconProps={{ width: '32', height: '32' }}
                                  containerStyle={{ zIndex: 1 }}
                                  hideSymbol={true}
                                />
                                <CurrencyAvatar
                                  symbol=""
                                  address={row.token2Address}
                                  iconProps={{ width: '34', height: '34' }}
                                  containerStyle={{ left: '18px', position: 'absolute', marginTop: '-34px' }}
                                  hideSymbol={true}
                                />
                                <CircleWrapper style={{ left: '42px', position: 'absolute', marginTop: '-36px' }}>
                                  <NIILogo />
                                </CircleWrapper>
                              </div>
                              <ColumnWrapper style={{ marginLeft: '42px' }}>
                                <TYPE.body fontWeight={500}>{row.poolName}</TYPE.body>
                                <TYPE.subHeader color={'text2'}>NiiFi</TYPE.subHeader>
                              </ColumnWrapper>
                            </RowWrapper>
                          </TableCell>
                          <TableCell style={{ ...rowCellStyles, width: '36%' }} align="right">
                            <TYPE.body color={theme.text6} fontWeight={400} fontSize={14} lineHeight={1.4}>
                              <Trans>Liquidity</Trans>
                            </TYPE.body>
                            <TYPE.mediumHeader>
                              {amount && !isNaN(amount) && (
                                <BaseCurrencyView type="symbol" value={amount} numeralFormat={currencyFormat} />
                              )}
                            </TYPE.mediumHeader>
                          </TableCell>
                          <TableCell style={rowCellStyles} align="right">
                            <>{'\u00A0'}</>
                            <Percent value={row.trendingPercentY} decimals={0} fontWeight={500} />
                          </TableCell>
                        </TableRow>
                      )
                    }}
                  />
                )}
                <LinkWrapper>
                  <Link
                    to={{
                      pathname: '/pools/overview',
                      state: { activeTab: 0, type: 'new' },
                    }}
                  >
                    <Trans>See all</Trans>
                  </Link>
                </LinkWrapper>
              </Card>
            </Grid>
            <Grid item xs={isSmallScreen ? 12 : 6}>
              <Card style={{ minHeight: '360px' }}>
                <CardHeader>
                  <TYPE.largeHeader fontWeight={400}>
                    <Trans>Tools</Trans>
                  </TYPE.largeHeader>
                  <GearIconsGrouped
                    width="200"
                    height="120"
                    color={theme.bg4}
                    style={{ marginRight: isSmallScreen ? '0' : '20px' }}
                  />
                </CardHeader>
              </Card>
            </Grid>
          </Grid>
        </BodyPanel>
      </BodyScroller>
    </>
  )
}
