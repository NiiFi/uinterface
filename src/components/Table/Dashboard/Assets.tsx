import React from 'react'
import { t } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components/macro'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import { TYPE, RowWrapper, BaseCurrencyView } from 'theme'
import { SampleResponse } from '../sample-tokens'
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
        <RowWrapper style={{ width: 'fit-content' }}>
          <CurrencyAvatar symbol={'ETH'} rootStyle={{ width: 'auto' }} hideSymbol={true} />
          <TYPE.black fontWeight={400} style={{ padding: '8px 0 0 6px', width: 'fit-content' }}>
            {row.symbol}
          </TYPE.black>
        </RowWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="right">
        {index + 1} {row.symbol}
        <br />
        <TYPE.subHeader color="text6" textAlign="right">
          {'≈ '}
          <BaseCurrencyView type="symbol" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} value={(index + 1) * 100} />
        </TYPE.subHeader>
      </TableCell>
    </StyledTableRow>
  )
}

export default function DashboardAssetsTable() {
  return (
    <Table
      hideHeader={true}
      rowsPerPage={8}
      title={t`Assets`}
      data={SampleResponse.data.tokens}
      headCells={[]}
      row={CustomTableRow}
    />
  )
}
