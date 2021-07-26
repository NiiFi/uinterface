import React, { useState, useEffect, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { NIILogo } from 'components/Icons'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { shortenDecimalValues } from '../../utils'
import { TYPE, RowWrapper, ColumnWrapper, CircleWrapper } from '../../theme'
import { getPoolsData } from './sample-pools'
import SearchableTable, { Order } from './SearchableTable'
import Loader from 'components/Loader'
import { PoolTableData } from '../Table/types'
import InvestButton from 'components/pools/InvestButton'
import { usePoolInvestModalToggle } from 'state/application/hooks'
import PoolInvestModal from 'components/PoolInvestModal'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Wrapper as DefaultToolBarWrapper, PagerWrapper as DefaultToolBarPagerWrapper } from './TableToolbar'

const LoaderWrapper = styled.div`
  padding: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 10rem);
`

const CustomTableRow = (row: any, index: number, handleClick: React.MouseEventHandler<HTMLButtonElement>) => {
  const theme = useTheme()
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}`, cursor: 'pointer' }
  const history = useHistory()

  const handleCellOnClick = () => {
    history.push('/pools/ETH/NII')
  }

  return (
    <TableRow hover role="checkbox" aria-checked={false} tabIndex={-1} key={index} selected={false}>
      <TableCell style={rowCellStyles} align="left" onClick={handleCellOnClick}>
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
              iconProps={{ width: '34', height: '34' }}
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
      <TableCell style={rowCellStyles} align="center" onClick={handleCellOnClick}>
        {shortenDecimalValues(row.liquidity, '$ 0.[00]a')}
      </TableCell>
      <TableCell style={rowCellStyles} align="center" onClick={handleCellOnClick}>
        <ColumnWrapper>
          <div>
            {shortenDecimalValues(row.roiY, '0.[00]a')} (<Trans>1Y</Trans>)
          </div>
          <TYPE.small color={'text2'}>
            {shortenDecimalValues(row.roiW, '0.[00]a')} (<Trans>1W</Trans>)
          </TYPE.small>
        </ColumnWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center" onClick={handleCellOnClick}>
        <ColumnWrapper>
          <div>
            {row.trendingPercent > 0 && '+'}
            {shortenDecimalValues(row.trendingPercent, '0.[00]')}%
          </div>
          <TYPE.small color={'text2'}>
            {row.trendingSum > 0 && '+'}
            {shortenDecimalValues(row.trendingSum + '', '$0.[000]a')}
          </TYPE.small>
        </ColumnWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <InvestButton
          token0={{ symbol: 'ETH', address: '1234' }}
          token1={{ symbol: 'NII', address: '1235' }}
          type="outlined"
          onClick={handleClick}
          style={{ fontSize: '14px' }}
          padding={'10px 14px'}
        >
          <Trans>Invest</Trans>
        </InvestButton>
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
  const { state } = useLocation<any>() // FIXME: any
  const poolsData = useMemo(() => {
    return getPoolsData('new', 100)
  }, [])
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<string>()
  const [pools, setPools] = useState<PoolTableData[]>(poolsData)

  const toggleInvestModal = usePoolInvestModalToggle()

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
        row={(row: any, index: number) => {
          return CustomTableRow(row, index, toggleInvestModal)
        }}
        defaultOrder={order}
        defaultOrderBy={orderBy}
      />
      <PoolInvestModal />
    </>
  )
}
