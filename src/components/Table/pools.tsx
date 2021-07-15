import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { NIILogo } from 'components/Icons'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { shortenDecimalValues } from '../../utils'
import { TYPE } from '../../theme'
import { SampleResponse } from './sample-pools'
import Table from './index'
import Loader from 'components/Loader'
import { TransactionTableData } from '../Table/types'
import InvestButton from 'components/pools/InvestButton'
import { usePoolInvestModalToggle } from 'state/application/hooks'
import PoolInvestModal from 'components/PoolInvestModal'
import useDebouncedChangeHandler from 'hooks/useDebouncedChangeHandler'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Disclaimer } from '../../theme'
import { SearchInput } from 'components/SearchModal/styleds'
import {
  Wrapper as DefaultToolBarWrapper,
  PagerWrapper as DefaultToolBarPagerWrapper,
  TitleWrapper as DefaultToolBarTitleWrapper,
} from './TableToolbar'

const LoaderWrapper = styled.div`
  padding: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 10rem);
`

const CircleWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg0};
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 50%;
  display: flex;
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CustomTableRow = (row: any, index: number, handleClick: React.MouseEventHandler<HTMLButtonElement>) => {
  const theme = useTheme()
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}`, cursor: 'pointer' }
  const history = useHistory()
  row.isNative = true

  // TODO: fill with real data
  const roiW = row.roiW || Math.random()
  const roiY = row.roiY || roiW / 52
  const trendingPercent = row.trendingPercent || Math.random() - 0.5
  const trendingSum = row.totalValueLockedUSD * trendingPercent

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
            {shortenDecimalValues(roiY, '0.[00]a')} (<Trans>1Y</Trans>)
          </div>
          <TYPE.small color={'text2'}>
            {shortenDecimalValues(roiW, '0.[00]a')} (<Trans>1W</Trans>)
          </TYPE.small>
        </ColumnWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center" onClick={handleCellOnClick}>
        <ColumnWrapper>
          <div>
            {trendingPercent > 0 && '+'}
            {shortenDecimalValues(trendingPercent, '0.0%')}
          </div>
          <TYPE.small color={'text2'}>
            {trendingSum > 0 && '+'}
            {shortenDecimalValues(trendingSum + '', '$0.[000]a')}
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

const PoolToolbarTitleWrapper = styled(DefaultToolBarTitleWrapper)`
  width: 65%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 78%;
  `}
`
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
  searchValue,
  onSearchValueChange,
}: {
  onNext: (page: number) => void
  onBack: (page: number) => void
  onSearchValueChange: (str: any) => void
  searchValue: string
  currentPage: number
  totalPages: number
}) => {
  return (
    <>
      <DefaultToolBarWrapper style={{ marginBottom: '1rem' }}>
        <PoolToolbarTitleWrapper>
          <SearchInput
            placeholder={t`Filter by token, protocol, ...`}
            value={searchValue}
            autoFocus
            onChange={(e) => onSearchValueChange(e.target.value)}
            style={{ width: '100%', height: '3rem' }}
          />
        </PoolToolbarTitleWrapper>
        <PoolToolBarPagerWrapper currentPage={currentPage} totalPages={totalPages}>
          <ArrowLeft onClick={() => onBack(currentPage)} />
          <p>{t`Page ${totalPages === 0 ? 0 : currentPage} of ${totalPages}`}</p>
          <ArrowRight onClick={() => onNext(currentPage)} />
        </PoolToolBarPagerWrapper>
      </DefaultToolBarWrapper>
      <Disclaimer>
        <span>Disclaimer:</span>
        {` `}
        {t`This is Dummy Data`}
      </Disclaimer>
    </>
  )
}
export default function PoolsTable() {
  const [pools, setPools] = useState<TransactionTableData[]>(SampleResponse.data.pools)
  function debouncedSearchChange(value: string) {
    setPools(
      SampleResponse.data.pools.filter((pool: any) => {
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
  }
  const [sword, setSword] = useDebouncedChangeHandler<string>('', debouncedSearchChange, 500)

  const toggleInvestModal = usePoolInvestModalToggle()

  if (!pools) {
    return (
      <LoaderWrapper>
        <Loader size="2rem" />
      </LoaderWrapper>
    )
  }

  return (
    <>
      <Table
        title={''}
        data={pools}
        showDisclaimer={true}
        headCells={[
          { id: 'token0.symbol', numeric: false, disablePadding: false, label: t`Available Pools` },
          { id: 'liquidity', numeric: true, disablePadding: false, label: t`Liquidity` },
          { id: 'roi', numeric: false, disablePadding: false, label: t`ROI` },
          { id: 'trending', numeric: false, disablePadding: false, label: t`Trending` },
          { id: '', numeric: false, disablePadding: false, label: '' },
        ]}
        renderToolbar={(props) => PoolTableToolbar({ ...props, searchValue: sword, onSearchValueChange: setSword })}
        row={(row: any, index: number) => {
          return CustomTableRow(row, index, toggleInvestModal)
        }}
      />
      <PoolInvestModal />
    </>
  )
}
