import React from 'react'
import { DefaultTheme } from 'styled-components'
import TableCell from '@material-ui/core/TableCell'
import { RowWrapper, BaseCurrencyView, TYPE } from 'theme'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { StyledTableRow } from './StyledTableRow'
import { shortenDecimalValues } from 'utils'

export const CustomWalletTableRow = (
  row: any,
  index: number,
  theme: DefaultTheme,
  handleClick: (event: React.MouseEvent<unknown>) => void
) => {
  const rowCellStyles = {
    color: theme.black,
    borderBottom: 'none',
    fontSize: '1rem',
  }

  return (
    <StyledTableRow
      hover
      onClick={(event) => handleClick(event)}
      role="checkbox"
      aria-checked={false}
      tabIndex={-1}
      key={index}
      selected={false}
    >
      <TableCell style={rowCellStyles} align="left">
        <RowWrapper style={{ width: 'fit-content' }}>
          <CurrencyAvatar
            symbol=""
            address={row.address}
            iconProps={{ width: '30', height: '30' }}
            rootStyle={{ width: 'auto' }}
            hideSymbol={true}
          />
          <TYPE.black fontWeight={400} style={{ padding: '8px 0 0 6px', width: 'fit-content' }}>
            {row.symbol}
          </TYPE.black>
        </RowWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="right">
        {shortenDecimalValues(row.balance)} {row.symbol}
        <br />
        <TYPE.subHeader color="text6" textAlign="right">
          <BaseCurrencyView type="symbol" value={row.total} />
        </TYPE.subHeader>
      </TableCell>
    </StyledTableRow>
  )
}
