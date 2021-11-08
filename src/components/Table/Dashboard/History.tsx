import React from 'react'
import { t } from '@lingui/macro'
import { format as formatDateFNS } from 'date-fns'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components/macro'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import { TYPE, BaseCurrencyView } from 'theme'
import { SampleHistoryResponse } from '../sample-history'
import { useEthereumToBaseCurrencyRatesAndApiState } from 'state/user/hooks'
import Table from '../index'

const StyledTableRow = styled(TableRow)`
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.bg3};
  }
  &:last-child {
    border-bottom: none;
  }
`
const CustomTableRow = (
  rates: any,
  row: any,
  index: number,
  theme: DefaultTheme,
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
) => {
  const rowCellStyles = {
    color: theme.black,
    borderBottom: 'none',
    fontSize: '1rem',
  }
  const value = rates?.['USD'] ? rates['USD'] * row.valueInETH : 0
  return (
    <StyledTableRow
      hover
      onClick={(event) => handleClick(event, row.id)}
      role="checkbox"
      aria-checked={false}
      tabIndex={-1}
      key={index}
      selected={false}
    >
      <TableCell style={rowCellStyles} align="left">
        {row.title}
        <br />
        <TYPE.subHeader color="text6" textAlign="left">
          {`${formatDateFNS(new Date(row.date), 'MMM, dd yyyy')}`}
        </TYPE.subHeader>
      </TableCell>
      <TableCell style={rowCellStyles} align="right">
        {row.type === 'amount-in' ? '+' : '-'}
        {row.valueInETH}
        <br />
        <TYPE.subHeader color="text6" textAlign="right">
          {'≈ '}
          <BaseCurrencyView type="symbol" value={value} />
        </TYPE.subHeader>
      </TableCell>
    </StyledTableRow>
  )
}

export default function DashboardHistoryTable() {
  const { ethereumToBaseCurrencyRates: rates } = useEthereumToBaseCurrencyRatesAndApiState()
  return (
    <Table
      hideHeader={true}
      rowsPerPage={8}
      title={t`History`}
      data={SampleHistoryResponse.data.history}
      headCells={[]}
      row={(...props) => CustomTableRow(rates, ...props)}
    />
  )
}
