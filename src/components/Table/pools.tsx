import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { MagnifierIcon, NIILogo } from 'components/Icons'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { shortenDecimalValues } from '../../utils'
import { TYPE } from '../../theme'
import { SampleResponse } from './sample-pools'
import Table from './index'
import { ButtonOutlined } from '../Button'
import { TransactionTableData } from '../Table/types'

const CircleWrapper = styled.div`
  background-color: white;
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

const CustomTableRow = (row: any, index: number) => {
  const theme = useTheme()
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}` }
  const history = useHistory()

  row.isNative = true

  // TODO: fill with real data
  const roiW = row.roiW || Math.random()
  const roiY = row.roiY || roiW / 52
  const trendingPercent = row.trendingPercent || Math.random() - 0.5
  const trendingSum = row.totalValueLockedUSD * trendingPercent

  const invest = (e: React.MouseEvent<unknown>) => {
    e.stopPropagation()
    console.log(e.target)
  }

  return (
    <TableRow
      hover
      onClick={() => history.push('/pool/ETH/NII')} // FIXME
      role="checkbox"
      aria-checked={false}
      tabIndex={-1}
      key={index}
      selected={false}
    >
      <TableCell style={rowCellStyles} align="left">
        <RowWrapper>
          <div>
            <CurrencyAvatar
              symbol={'ETH'}
              iconProps={{ width: '32', height: '32' }}
              containerStyle={{ zIndex: 1 }}
              hideSymbol={true}
            />
            <CurrencyAvatar
              symbol={'NII'}
              iconProps={{ width: '34', height: '34' }}
              containerStyle={{ left: '38px', position: 'absolute', marginTop: '-34px' }}
              hideSymbol={true}
            />
            <CircleWrapper style={{ left: '62px', position: 'absolute', marginTop: '-36px' }}>
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
        {shortenDecimalValues(row.liquidity, '$ 0.[00]a')}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <ColumnWrapper>
          <div>
            {shortenDecimalValues(roiY, '0.[00]a')} (<Trans>1Y</Trans>)
          </div>
          <TYPE.small color={'text2'}>
            {shortenDecimalValues(roiW, '0.[00]a')} (<Trans>1W</Trans>)
          </TYPE.small>
        </ColumnWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
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
        <ButtonOutlined
          value={row.id}
          onClick={invest}
          padding="5px"
          margin="2px 4px"
          style={{
            textTransform: 'uppercase',
          }}
        >
          <Trans>Invest</Trans>
        </ButtonOutlined>
      </TableCell>
    </TableRow>
  )
}

export default function PoolsTable() {
  const [sword, setSword] = useState<string>('')
  const [pools, setPools] = useState<TransactionTableData[]>()
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSword(e.target.value)
  }
  const searchField = (
    <TextField
      type="search"
      placeholder={t`Filter by token, protocol, ...`}
      value={sword}
      variant="outlined"
      margin="dense"
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MagnifierIcon />
          </InputAdornment>
        ),
      }}
      style={{ width: '460px', height: '48px' }}
      autoFocus
    />
  )

  useEffect(() => {
    setPools(SampleResponse.data.pools.filter((pool: any) => pool.token0.name.includes(sword))) // TODO: add filters
  }, [sword])

  useEffect(() => {
    setPools(SampleResponse.data.pools)
  }, [])

  if (!pools) {
    return <>Loading ...</>
  }

  return (
    <>
      <Table
        title={searchField}
        data={pools}
        headCells={[
          { id: 'token0.symbol', numeric: false, disablePadding: false, label: t`Available Pools` },
          { id: 'liquidity', numeric: true, disablePadding: false, label: t`Liquidity` },
          { id: 'roi', numeric: false, disablePadding: false, label: t`ROI` },
          { id: 'trending', numeric: false, disablePadding: false, label: t`Trending` },
          { id: '', numeric: false, disablePadding: false, label: '' },
        ]}
        row={CustomTableRow}
      />
    </>
  )
}
