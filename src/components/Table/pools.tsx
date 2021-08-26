import React, { useState, useEffect, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import { NIILogo } from 'components/Icons'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { shortenDecimalValues } from '../../utils'
import { TYPE, RowWrapper, ColumnWrapper, CircleWrapper, BaseCurrencyView } from '../../theme'
import { getPoolsData } from './sample-pools'
import SearchableTable, { Order } from './SearchableTable'
import Loader from 'components/Loader'
import { PoolTableData } from '../Table/types'
import { ButtonOutlined } from 'components/Button'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Wrapper as DefaultToolBarWrapper, PagerWrapper as DefaultToolBarPagerWrapper } from './TableToolbar'
import { History, LocationState } from 'history'

const LoaderWrapper = styled.div`
  padding: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 10rem);
`

const CustomTableRow = (row: any, index: number, history: History<LocationState>, theme: DefaultTheme) => {
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}`, cursor: 'pointer' }

  const handleCellOnClick = (id: string) => {
    history.push(`/pool/${id}`)
  }

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={false}
      tabIndex={-1}
      key={index}
      selected={false}
      onClick={() => handleCellOnClick(row.id)}
    >
      <TableCell style={rowCellStyles} align="left">
        <RowWrapper>
          <div style={{ position: 'relative' }}>
            <CurrencyAvatar
              symbol={row.token0.symbol}
              address={row.token0.id}
              iconProps={{ width: '32', height: '32' }}
              containerStyle={{ zIndex: 1 }}
              hideSymbol={true}
            />
            <CurrencyAvatar
              symbol={row.token1.symbol}
              address={row.token1.id}
              iconProps={{ width: '32', height: '32' }}
              containerStyle={{ left: '18px', position: 'absolute', marginTop: '-34px' }}
              hideSymbol={true}
            />
            <CircleWrapper style={{ left: '42px', position: 'absolute', marginTop: '-36px' }}>
              <NIILogo />
            </CircleWrapper>
          </div>
          <ColumnWrapper style={{ marginLeft: '42px' }}>
            <div>
              {row.token0.symbol} / {row.token1.symbol}
            </div>
            <TYPE.small color={'text2'}>NiiFi</TYPE.small>
          </ColumnWrapper>
        </RowWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" value={row.liquidity} numeralFormat={'0.[00]a'} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <ColumnWrapper>
          <div>
            {shortenDecimalValues(row.roiY, '0.[00]a')} (<Trans>1Y</Trans>)
          </div>
          <TYPE.small color={'text2'}>
            {shortenDecimalValues(row.roiW, '0.[00]a')} (<Trans>1W</Trans>)
          </TYPE.small>
        </ColumnWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <ColumnWrapper>
          <div>
            {row.trendingPercent > 0 && '+ '}
            {shortenDecimalValues(row.trendingPercent, '0.[00]')}%
          </div>
          <TYPE.small color={'text2'}>
            {row.trendingSum > 0 && '+ '}
            <BaseCurrencyView type="symbol" value={row.trendingSum} numeralFormat={'0.[000]a'} />
          </TYPE.small>
        </ColumnWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <ButtonOutlined style={{ fontSize: '14px' }} padding={'10px 14px'}>
          <Trans>Add Liquidity</Trans>
        </ButtonOutlined>
      </TableCell>
    </TableRow>
  )
}

const PoolToolBarPagerWrapper = styled(DefaultToolBarPagerWrapper)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    > p {
      display: none;
    }
    > svg {
      margin: 0px 8px;
      width: 1.2rem;
      height: 1.2rem;
    }
  `}
`

const PoolTableToolbar = ({
  onNext,
  onBack,
  currentPage,
  totalPages,
}: {
  onNext: (page: number) => void
  onBack: (page: number) => void
  currentPage: number
  totalPages: number
}) => {
  return (
    <DefaultToolBarWrapper style={{ width: 'auto' }}>
      <PoolToolBarPagerWrapper currentPage={currentPage} totalPages={totalPages}>
        <ArrowLeft onClick={() => onBack(currentPage)} />
        <p>{t`Page ${totalPages === 0 ? 0 : currentPage} of ${totalPages}`}</p>
        <ArrowRight onClick={() => onNext(currentPage)} />
      </PoolToolBarPagerWrapper>
    </DefaultToolBarWrapper>
  )
}
export default function PoolsTable() {
  const history = useHistory()
  const theme = useTheme()
  const { state } = useLocation<any>() // FIXME: any
  const poolsData = useMemo(() => {
    return getPoolsData('new', 100)
  }, [])
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<string>()
  const [pools, setPools] = useState<PoolTableData[]>(poolsData)

  useEffect(() => {
    // TODO: implement sorting
    if (state?.type !== undefined) {
      setOrderBy('roiY')
      setOrder(state.type === 'looser' ? 'asc' : 'desc')
    } else {
      setOrderBy('token0.symbol')
      setOrder('asc')
    }
  }, [state])

  if (!pools) {
    return (
      <LoaderWrapper>
        <Loader size="2rem" />
      </LoaderWrapper>
    )
  }

  return (
    <>
      <SearchableTable
        title={''}
        data={pools}
        searchLabel={t`Filter by token, protocol, ...`}
        debouncedSearchChange={(value: string) => {
          setPools(
            poolsData.filter((pool: any) => {
              const regex = new RegExp(`^${value}`, 'ig')
              const { name: token0Name, symbol: token0Symbol, id: token0Id } = pool.token0
              const { name: token1Name, symbol: token1Symbol, id: token1Id } = pool.token1
              return (
                regex.test(token0Name) ||
                regex.test(token0Symbol) ||
                regex.test(token0Id) ||
                regex.test(token1Name) ||
                regex.test(token1Symbol) ||
                regex.test(token1Id)
              )
            })
          )
        }}
        headCells={[
          { id: 'token0.symbol', numeric: false, disablePadding: false, label: t`Available Pools` },
          { id: 'liquidity', numeric: true, disablePadding: false, label: t`Liquidity` },
          { id: 'roiY', numeric: false, disablePadding: false, label: t`ROI` },
          { id: 'trendingSum', numeric: false, disablePadding: false, label: t`Trending` },
          { id: '', numeric: false, disablePadding: false, label: '' },
        ]}
        renderToolbar={(props) =>
          PoolTableToolbar({
            ...props,
          })
        }
        row={(row: any, index: number) => CustomTableRow(row, index, history, theme)}
        defaultOrder={order}
        defaultOrderBy={orderBy}
      />
    </>
  )
}
