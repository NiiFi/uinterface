import React from 'react'
import { DefaultTheme } from 'styled-components'
import { Trans } from '@lingui/macro'
import { format } from 'date-fns'
import { TYPE, RowWrapper, BaseCurrencyView, ColumnWrapper, CircleWrapper } from 'theme'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import CurrencyAvatar from 'components/CurrencyAvatar'
import TableCell from '@material-ui/core/TableCell'
import styled from 'styled-components'
import { NIILogo } from 'components/Icons'
import TableRow from '@material-ui/core/TableRow'

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

  const dateRowValue = format(new Date(row.date), 'MMMM d, yyyy')

  return (
    <>
      <StyledTableRow
        role="checkbox"
        aria-checked={false}
        tabIndex={-1}
        key={row.date}
        selected={false}
        style={{ display: showDate ? 'flex' : 'none' }}
      >
        <TableCell style={rowCellStyles} align="left">
          <RowWrapper style={{ width: 'fit-content', alignItems: 'center' }}>{dateRowValue}</RowWrapper>
        </TableCell>
      </StyledTableRow>
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
          <RowWrapper style={{ width: 'fit-content', alignItems: 'center' }}>
            <SvgIconWrapper src={LiquiditySvgSrc} />
            <ColumnWrapper style={{ marginLeft: '5px' }}>
              <TYPE.subHeader color={'text2'}>{format(new Date(row.date), 'HH:mmaaa')}</TYPE.subHeader>
              <TYPE.body fontWeight={500}>
                <Trans>Add Liquidity</Trans>
              </TYPE.body>
            </ColumnWrapper>
          </RowWrapper>
        </TableCell>
        <TableCell style={rowCellStyles} align="center">
          <div style={{ marginLeft: '5px', display: 'flex' }}>
            <div style={{ position: 'relative' }}>
              <CurrencyAvatar
                symbol={row.from.symbol}
                iconProps={{ width: '32', height: '32' }}
                containerStyle={{ zIndex: 1 }}
                hideSymbol={true}
              />
              <CurrencyAvatar
                symbol={row.to.symbol}
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
                {row.from.value} {row.from.symbol}
              </TYPE.body>
              <TYPE.body fontWeight={500} style={{ display: 'flex' }}>
                {row.to.value} {row.to.symbol}
              </TYPE.body>
            </ColumnWrapper>
          </div>
        </TableCell>
        <TableCell style={rowCellStyles}>
          <ColumnWrapper style={{ marginLeft: '5px', alignItems: 'flex-end' }}>
            <TYPE.subHeader color={'text2'} style={{ display: 'flex' }}>
              <Trans>fee</Trans>
            </TYPE.subHeader>
            <TYPE.body fontWeight={500} style={{ display: 'flex' }}>
              <BaseCurrencyView type="symbol" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} value={row.fee} />
            </TYPE.body>
          </ColumnWrapper>
        </TableCell>
      </StyledTableRow>
    </>
  )
}
