import React from 'react'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { shortenDecimalValues } from '../../utils'
import CurrencyLogo from '../CurrencyLogo'
import { SampleResponse } from './sample-pools'
import Table from './index'
import { ButtonOutlined } from '../Button'

const ResponsiveLogo = styled(CurrencyLogo)`
  @media screen and (max-width: 670px) {
    width: 16px;
    height: 16px;
  }
`

const CustomTableRow = (
  row: any,
  index: number,
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
) => {
  const theme = useTheme()
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}` }

  row.isNative = true

  // TODO: fill with real data
  const roiW = row.roiW || Math.random()
  const roiY = row.roiY || roiW / 52
  const trendingPercent = row.trendingPercent || (Math.random() - 0.5) * 100
  const trendingSum = row.totalValueLockedUSD * trendingPercent

  const invest = (e: React.MouseEvent<unknown>) => console.log(e.target)

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.id)}
      role="checkbox"
      aria-checked={false}
      tabIndex={-1}
      key={index}
      selected={false}
    >
      <TableCell style={rowCellStyles} align="left">
        <ResponsiveLogo currency={row} />
        {row.token0.symbol} / {row.token1.symbol}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.liquidity, '0.[00]a')}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(roiY, '0.[00]a')} - {shortenDecimalValues(roiW, '0.[00]a')}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {trendingPercent} - {trendingSum}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <ButtonOutlined
          value={row.id}
          onClick={invest}
          padding="6px"
          margin="10px 18px"
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
  return (
    <Table
      data={SampleResponse.data.pools}
      headCells={[
        { id: 'token0.symbol', numeric: false, disablePadding: false, label: t`Available Pools` },
        { id: 'liquidity', numeric: true, disablePadding: false, label: t`Liquidity` },
        { id: 'address', numeric: false, disablePadding: false, label: t`ROI` },
        { id: 'address2', numeric: false, disablePadding: false, label: t`Trending` },
      ]}
      row={CustomTableRow}
    />
  )
}
