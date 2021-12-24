import React from 'react'
import { Trans } from '@lingui/macro'
import { DefaultTheme } from 'styled-components'
import TableCell from '@material-ui/core/TableCell'
import { RowWrapper, BaseCurrencyView, CircleWrapper, ColumnWrapper, TYPE } from 'theme'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { NIILogo } from 'components/Icons'
import { shortenDecimalValues } from 'utils'
import { StyledTableRow } from './StyledTableRow'

export const CustomPoolsTableRow = (
  row: any,
  index: number,
  theme: DefaultTheme,
  handleRowClick: (e: React.MouseEvent<unknown>, rowId: string) => void
) => {
  const rowCellStyles = {
    color: theme.black,
    borderBottom: 'none',
    fontSize: '1rem',
  }

  return (
    <StyledTableRow
      hover
      onClick={(event) => handleRowClick(event, row.address)}
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
              address={row.token0.address}
              iconProps={{ width: '32', height: '32' }}
              containerStyle={{ zIndex: 1 }}
              hideSymbol={true}
            />
            <CurrencyAvatar
              symbol={row.token1.symbol}
              address={row.token1.address}
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
        {shortenDecimalValues(row.token0.amount)} {row.token0.symbol} / {shortenDecimalValues(row.token1.amount)}{' '}
        {row.token1.symbol}
        <br />
        <TYPE.subHeader color={'text2'} textAlign={'right'}>
          <BaseCurrencyView type="symbol" value={row.amountUSD} />
          {row?.feeUSD && (
            <>
              <span> |</span> <Trans>fees</Trans>: <BaseCurrencyView type="symbol" value={row.feeUSD} />
            </>
          )}
        </TYPE.subHeader>
      </TableCell>
    </StyledTableRow>
  )
}
