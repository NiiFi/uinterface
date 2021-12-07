import React from 'react'
import { DefaultTheme } from 'styled-components'
import { Trans } from '@lingui/macro'
import { format } from 'date-fns'
import { TYPE, RowWrapper, BaseCurrencyView, ColumnWrapper, CircleWrapper } from 'theme'
import CurrencyAvatar from 'components/CurrencyAvatar'
import TableCell from '@material-ui/core/TableCell'
import styled from 'styled-components'
import { NIILogo } from 'components/Icons'
import TableRow from '@material-ui/core/TableRow'
import { shortenDecimalValues } from 'utils'

// SVGs
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

export function LiquidityRow({
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

  const dateRowValue = format(new Date(row.date), 'MMMM d, yyyy')
  const sign = row.type === 'Mint' ? '-' : '+'

  return (
    <>
      <DateStyledTableRow
        role="checkbox"
        aria-checked={false}
        tabIndex={-1}
        key={row.date}
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
            <SvgIconWrapper src={LiquiditySvgSrc} />
            <ColumnWrapper style={{ marginLeft: '5px' }}>
              <TYPE.subHeader color={'text2'}>{format(new Date(row.date), 'HH:mmaaa')}</TYPE.subHeader>
              <TYPE.body fontWeight={500}>
                {row.type === 'Mint' ? <Trans>Add Liquidity</Trans> : <Trans>Remove Liquidity</Trans>}
              </TYPE.body>
            </ColumnWrapper>
          </RowWrapper>
        </TableCell>
        <TableCell style={rowCellStyles} align="center">
          <div style={{ marginLeft: '5px', display: 'flex' }}>
            <div style={{ position: 'relative' }}>
              <CurrencyAvatar
                symbol=""
                address={row.from.address}
                iconProps={{ width: '32', height: '32' }}
                containerStyle={{ zIndex: 1 }}
                hideSymbol={true}
              />
              <CurrencyAvatar
                symbol=""
                address={row.to.address}
                iconProps={{ width: '32', height: '32' }}
                containerStyle={{ left: '18px', position: 'absolute', marginTop: '-32px' }}
                hideSymbol={true}
              />
              <CircleWrapper style={{ left: '42px', position: 'absolute', marginTop: '-36px' }}>
                <NIILogo id="poolsNiiLogo" />
              </CircleWrapper>
            </div>
            <ColumnWrapper style={{ marginLeft: '42px' }}>
              <TYPE.body fontWeight={500}>
                {row.from.symbol} / {row.to.symbol}
              </TYPE.body>
              <TYPE.subHeader color={'text2'} style={{ display: 'flex' }}>
                NiiFi
              </TYPE.subHeader>
            </ColumnWrapper>
          </div>
        </TableCell>
        <TableCell style={rowCellStyles} align="center">
          <div style={{ marginLeft: '5px', display: 'flex' }}>
            <ColumnWrapper style={{ marginLeft: '5px' }}>
              <TYPE.body fontWeight={500} style={{ display: 'flex' }}>
                {`${sign} ${shortenDecimalValues(row.from.value)}`} {row.from.symbol}
              </TYPE.body>
              <TYPE.body fontWeight={500} style={{ display: 'flex' }}>
                {`${sign} ${shortenDecimalValues(row.to.value)}`} {row.to.symbol}
              </TYPE.body>
            </ColumnWrapper>
          </div>
        </TableCell>
        <TableCell style={rowCellStyles}>
          <ColumnWrapper style={{ marginLeft: '5px', alignItems: 'flex-end' }}>
            {/* <TYPE.subHeader color={'text2'} style={{ display: 'flex' }}>
              <Trans>fee</Trans>
            </TYPE.subHeader>
            <TYPE.body fontWeight={500} style={{ display: 'flex' }}>
              <BaseCurrencyView type="symbol" value={row.fee} />
            </TYPE.body> */}
          </ColumnWrapper>
        </TableCell>
      </StyledTableRow>
    </>
  )
}
