import React from 'react'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Percent from 'components/Percent'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { shortenDecimalValues } from '../../utils'
import { TYPE } from '../../theme'
import { SampleResponse } from './sample-tokens'
import Table from './index'

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const CustomTableRow = (
  row: any,
  index: number,
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
) => {
  const theme = useTheme()
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}`, fontSize: '16px' }

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
        <RowWrapper>
          <CurrencyAvatar symbol={'ETH'} containerStyle={{ padding: '0.3125rem' }} hideSymbol={true} />
          <TYPE.black fontWeight={400} style={{ padding: '8px 0 0 6px' }}>
            {row.symbol}
          </TYPE.black>
        </RowWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.priceUSD)}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <Percent value={row.priceUSDChange} fontWeight={400} />
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
        { id: 'symbol', numeric: false, disablePadding: false, label: t`Name` },
        { id: 'priceUSD', numeric: true, disablePadding: false, label: t`Price` },
        { id: 'priceUSDChange', numeric: true, disablePadding: false, label: t`Price Change` },
        { id: 'volumeUSD', numeric: true, disablePadding: false, label: t`Volume 24H` },
        { id: 'tvlUSD', numeric: true, disablePadding: false, label: t`TVL` },
      ]}
      row={CustomTableRow}
    />
  )
}
