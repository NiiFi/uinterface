import React from 'react'
import { DefaultTheme } from 'styled-components'
import TableCell from '@material-ui/core/TableCell'
import { RowWrapper, BaseCurrencyView, TYPE } from 'theme'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { StyledTableRow } from './StyledTableRow'

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
            symbol={row.symbol}
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
        {index + 1} {row.symbol}
        <br />
        <TYPE.subHeader color="text6" textAlign="right">
          <BaseCurrencyView type="symbol" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} value={(index + 1) * 100} />
        </TYPE.subHeader>
      </TableCell>
    </StyledTableRow>
  )
}
