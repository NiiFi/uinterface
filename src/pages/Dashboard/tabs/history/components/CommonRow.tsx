import React from 'react'
import { allowedTypes } from './HistoryTable'
import TableRow from '@material-ui/core/TableRow'
import { DefaultTheme } from 'styled-components'
import { Trans } from '@lingui/macro'
import { format } from 'date-fns'
import { TYPE, RowWrapper, BaseCurrencyView, ColumnWrapper } from 'theme'
import CurrencyAvatar from 'components/CurrencyAvatar'
import TableCell from '@material-ui/core/TableCell'
import styled from 'styled-components'
import { shortenDecimalValues } from 'utils'

// SVGs
import SentSvgSrc from 'assets/svg/sent.svg'
import ReceiveSvgSrc from 'assets/svg/receive.svg'
import SwapSvgSrc from 'assets/svg/swap.svg'
import LiquiditySvgSrc from 'assets/svg/liquidity.svg'

const SvgIconWrapper = styled.img`
  height: 32px;
`

const StyledTableRow = styled(TableRow)`
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.bg3};
  }
  &:last-child {
    border-bottom: none;
  }
  td:first-child {
    padding-left: 32px;
  }
`

const DateStyledTableRow = styled(StyledTableRow)`
  border-top: none;
`

export function CommonRow({
  row,
  index,
  theme,
  handleClick,
  showDate,
}: {
  row: any
  index: number
  theme: DefaultTheme
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
  showDate: boolean
}) {
  const rowCellStyles = {
    color: theme.black,
    borderBottom: 'none',
    fontSize: '1rem',
  }
  const dateRowCellStyles = {
    ...rowCellStyles,
    paddingTop: '36px',
    fontWeight: 600,
  }

  const shortAdress = row.address && row.address.slice(0, 6).concat('...', row.address.slice(-4))
  const dateRowValue = format(new Date(row.date), 'MMMM d, yyyy')

  let typeIconSrc = LiquiditySvgSrc

  switch (row.type) {
    case 'Send':
      typeIconSrc = SentSvgSrc
      break
    case 'Receive':
      typeIconSrc = ReceiveSvgSrc
      break
    case 'Swap':
      typeIconSrc = SwapSvgSrc
      break
  }
  return (
    <>
      <DateStyledTableRow
        role="checkbox"
        aria-checked={false}
        tabIndex={-1}
        key={`${row.date}_${index}`}
        selected={false}
        style={{ display: showDate ? 'table-row' : 'none' }}
      >
        <TableCell style={dateRowCellStyles} align="left">
          <RowWrapper style={{ width: 'fit-content', alignItems: 'center' }}>{dateRowValue}</RowWrapper>
        </TableCell>
      </DateStyledTableRow>
      <StyledTableRow
        hover
        onClick={(event) => handleClick(event, row.hash)}
        role="checkbox"
        aria-checked={false}
        tabIndex={-1}
        key={index}
        selected={false}
        style={{ cursor: 'pointer' }}
      >
        <TableCell style={rowCellStyles} align="left">
          <RowWrapper style={{ width: 'fit-content', alignItems: 'center' }}>
            <SvgIconWrapper src={typeIconSrc} />
            <ColumnWrapper style={{ marginLeft: '5px' }}>
              <TYPE.subHeader color={'text2'}>{format(new Date(row.date), 'HH:mmaaa')}</TYPE.subHeader>
              <TYPE.body fontWeight={500}>{allowedTypes[row.type]}</TYPE.body>
            </ColumnWrapper>
          </RowWrapper>
        </TableCell>
        <TableCell style={rowCellStyles} align="center">
          <div style={{ marginLeft: '5px', display: 'flex' }}>
            <CurrencyAvatar
              symbol=""
              address={row.from.address}
              iconProps={{ width: '30', height: '30' }}
              rootStyle={{ width: 'auto' }}
              hideSymbol={true}
            />
            <ColumnWrapper style={{ marginLeft: '5px' }}>
              <TYPE.subHeader color={'text2'} style={{ display: 'flex' }}>
                {row.type === 'send' ? <Trans>To</Trans> : <Trans>From</Trans>}
              </TYPE.subHeader>
              <TYPE.body fontWeight={500}>
                {row.type === 'Swap' ? `-${shortenDecimalValues(row.from.value)} ${row.from.symbol}` : shortAdress}
              </TYPE.body>
            </ColumnWrapper>
          </div>
        </TableCell>
        <TableCell style={rowCellStyles} align="center">
          <div style={{ marginLeft: '5px', display: 'flex' }}>
            <CurrencyAvatar
              symbol=""
              address={row.to.address}
              iconProps={{ width: '30', height: '30' }}
              rootStyle={{ width: 'auto' }}
              hideSymbol={true}
            />
            <ColumnWrapper style={{ marginLeft: '5px' }}>
              <TYPE.subHeader color={'text2'} style={{ display: 'flex' }}>
                {row.type === 'Swap' ? <Trans>To</Trans> : <Trans>Amount</Trans>}
              </TYPE.subHeader>
              <TYPE.body fontWeight={500} style={{ display: 'flex' }}>
                {/* {row.type === 'Swap' ? row.from.value : row.amount.value} {tokenTwoSymbol} */}
                {`+${shortenDecimalValues(row.to.value)}`} {row.to.symbol}
              </TYPE.body>
            </ColumnWrapper>
          </div>
        </TableCell>
        <TableCell style={rowCellStyles}>
          <ColumnWrapper style={{ marginLeft: '5px', alignItems: 'flex-end' }}>
            <TYPE.subHeader color={'text2'} style={{ display: 'flex' }}>
              <Trans>Fee</Trans>
            </TYPE.subHeader>
            <TYPE.body fontWeight={500} style={{ display: 'flex' }}>
              <BaseCurrencyView type="symbol" value={row.feesUSD} />
            </TYPE.body>
          </ColumnWrapper>
        </TableCell>
      </StyledTableRow>
    </>
  )
}
