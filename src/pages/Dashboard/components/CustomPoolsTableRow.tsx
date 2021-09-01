import React from 'react'
import { DefaultTheme } from 'styled-components'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components/macro'
import TableCell from '@material-ui/core/TableCell'
import { RowWrapper, BaseCurrencyView, CircleWrapper, ColumnWrapper, TYPE } from 'theme'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { NIILogo } from 'components/Icons'
// TODO: move to shared
const StyledTableRow = styled(TableRow)`
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.bg3};
  }
`

export const CustomPoolsTableRow = (
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
          <div style={{ position: 'relative' }}>
            <CurrencyAvatar
              symbol={row.token0.symbol}
              address={row.token0.id}
              iconProps={{ width: '32', height: '32' }}
              containerStyle={{ zIndex: 1 }}
              hideSymbol={true}
            />
            <CurrencyAvatar
              symbol={row.token1.symbol}
              address={row.token1.id}
              iconProps={{ width: '34', height: '34' }}
              containerStyle={{ left: '18px', position: 'absolute', marginTop: '-34px' }}
              hideSymbol={true}
            />
            <CircleWrapper style={{ left: '42px', position: 'absolute', marginTop: '-36px' }}>
              <NIILogo />
            </CircleWrapper>
          </div>
          <ColumnWrapper style={{ marginLeft: '42px' }}>
            <TYPE.body fontWeight={500}>
              {row.token0.symbol} / {row.token1.symbol}
            </TYPE.body>
            <TYPE.subHeader color={'text2'}>NiiFi</TYPE.subHeader>
          </ColumnWrapper>
        </RowWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="right">
        13 {row.token0.symbol} / 6 {row.token1.symbol}
        <br />
        <TYPE.subHeader color={'text2'} textAlign={'right'}>
          <BaseCurrencyView type="symbol" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} value={635.23} />
        </TYPE.subHeader>
      </TableCell>
    </StyledTableRow>
  )
}
