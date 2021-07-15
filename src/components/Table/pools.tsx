import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { createStyles, makeStyles } from '@material-ui/core/styles'
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
import Loader from 'components/Loader'
import { TransactionTableData } from '../Table/types'
import InvestButton from 'components/pools/InvestButton'
import { usePoolInvestModalToggle } from 'state/application/hooks'
import PoolInvestModal from 'components/PoolInvestModal'

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

const TextFieldWrapper = styled.div`
  width: 460px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    max-width: 255px;
  `}
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

export default function PoolsTable() {
  const theme = useTheme()
  const [sword, setSword] = useState<string>('')
  const [pools, setPools] = useState<TransactionTableData[]>()
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSword(e.target.value)
  }
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        background: theme.bg7,
        borderRadius: 6,
        color: theme.text6,
      },
      notchedOutline: {
        borderColor: theme.text6,
      },
    })
  )
  const classes = useStyles()
  const searchField = (
    <TextFieldWrapper>
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
          classes: classes,
        }}
        style={{ width: '100%', height: '48px' }}
        autoFocus
      />
    </TextFieldWrapper>
  )
  const toggleInvestModal = usePoolInvestModalToggle()

  useEffect(() => {
    setPools(SampleResponse.data.pools.filter((pool: any) => pool.token0.name.includes(sword))) // TODO: add filters
  }, [sword])

  useEffect(() => {
    setPools(SampleResponse.data.pools)
  }, [])

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
        title={searchField}
        data={pools}
        headCells={[
          { id: 'token0.symbol', numeric: false, disablePadding: false, label: t`Available Pools` },
          { id: 'liquidity', numeric: true, disablePadding: false, label: t`Liquidity` },
          { id: 'roi', numeric: false, disablePadding: false, label: t`ROI` },
          { id: 'trending', numeric: false, disablePadding: false, label: t`Trending` },
          { id: '', numeric: false, disablePadding: false, label: '' },
        ]}
        row={(row: any, index: number) => {
          return CustomTableRow(row, index, toggleInvestModal)
        }}
      />
      <PoolInvestModal />
    </>
  )
}
