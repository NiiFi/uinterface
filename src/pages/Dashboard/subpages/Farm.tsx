import React from 'react'
import { t, Trans } from '@lingui/macro'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { FarmIcon, NIILogo } from 'components/Icons'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import { TYPE, RowWrapper, ColumnWrapper, BaseCurrencyView, CircleWrapper } from 'theme'
import { SampleResponse } from 'components/Table/sample-pools'
import Table from 'components/Table'
import useTheme from 'hooks/useTheme'
import { StyledTableRow, LogoWrapper } from './styleds'

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
        <RowWrapper>
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
              iconProps={{ width: '32', height: '32' }}
              containerStyle={{ left: '22px', position: 'absolute', marginTop: '-34px' }}
              hideSymbol={true}
            />
            <CircleWrapper style={{ left: '46px', position: 'absolute', marginTop: '-36px' }}>
              <NIILogo id="poolsNiiLogo" />
            </CircleWrapper>
          </div>
          <ColumnWrapper style={{ marginLeft: '40px' }}>
            <TYPE.body>
              {row.token0.symbol} / {row.token1.symbol}
            </TYPE.body>
            <TYPE.subHeader color={'text2'}>NiiFi</TYPE.subHeader>
          </ColumnWrapper>
        </RowWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {index + 2} {row.token0.symbol} / {index + 1} {row.token1.symbol}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} value={row.token0Price} />
      </TableCell>
    </StyledTableRow>
  )
}

export default function Farm() {
  const theme = useTheme()
  const balance = 1467.14
  return (
    <Table
      headCells={[
        { id: 'token0.symbol', numeric: false, align: 'left', disablePadding: false, label: t`Assets` },
        { id: 'balance', numeric: true, disablePadding: false, label: t`Balance` },
        { id: 'token0Price', numeric: true, disablePadding: false, label: t`Value` },
      ]}
      rowsPerPage={8}
      title={
        <>
          <RowWrapper style={{ padding: '16px' }}>
            <LogoWrapper style={{ backgroundColor: theme.green2 }}>
              <FarmIcon color="#fff" opacity="1" />
            </LogoWrapper>
            <ColumnWrapper style={{ padding: '0 0 0 15px' }}>
              <TYPE.body>
                <Trans>Balance</Trans>
              </TYPE.body>
              <TYPE.mediumHeader>
                <BaseCurrencyView type="symbol" value={balance} />
              </TYPE.mediumHeader>
            </ColumnWrapper>
          </RowWrapper>
        </>
      }
      data={SampleResponse.data.pools}
      row={CustomTableRow}
    />
  )
}
