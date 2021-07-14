import React from 'react'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Percent from 'components/Percent'
import { shortenDecimalValues } from '../../utils'
import CurrencyLogo from '../CurrencyLogo'
import { SampleResponse } from './sample-tokens'
import Table from './index'

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
  // const logoData = { isNative: true, isToken: false, symbol: row.symbol }
  // const logoData = row

  row.isNative = true
  row.isToken = false

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
      <TableCell style={rowCellStyles} align="center">
        {index + 1}
      </TableCell>
      <TableCell style={rowCellStyles} align="left">
        <ResponsiveLogo currency={row} />
        {row.symbol}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.priceUSD)}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <Percent value={row.priceUSDChange} fontWeight={400} fontSize={'0.875rem'} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        ${shortenDecimalValues(row.volumeUSD)}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        ${shortenDecimalValues(row.tvlUSD)}
      </TableCell>
    </TableRow>
  )
}

export default function OverviewTable() {
  return (
    <Table
      title={t`Top Tokens`}
      data={SampleResponse.data.tokens}
      headCells={[
        { id: 'number', numeric: true, disablePadding: false, label: '#' },
        { id: 'amount0', numeric: true, disablePadding: false, label: t`Name` },
        { id: 'amount1', numeric: true, disablePadding: false, label: t`Price` },
        { id: 'address', numeric: false, disablePadding: false, label: t`Price Change` },
        { id: 'address2', numeric: false, disablePadding: false, label: t`Volume 24H` },
        { id: 'transaction.timestamp', numeric: false, disablePadding: false, label: t`TVL` },
      ]}
      row={CustomTableRow}
    />
  )
}
