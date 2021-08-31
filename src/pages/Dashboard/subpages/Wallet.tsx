import React from 'react'
import { t, Trans } from '@lingui/macro'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { WalletIcon } from 'components/Icons'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import { TYPE, RowWrapper, ColumnWrapper, BaseCurrencyView } from 'theme'
import { SampleResponse } from 'components/Table/sample-tokens'
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
      <TableCell style={rowCellStyles} align="center">
        {(index + 1) * 0.25}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} value={(index + 1) * 98.36} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} value={row.txCount} />
      </TableCell>
    </StyledTableRow>
  )
}

export default function Wallet() {
  const theme = useTheme()
  const balance = 5265.62
  return (
    <Table
      headCells={[
        { id: 'assets', numeric: false, align: 'left', disablePadding: false, label: t`Assets` },
        { id: 'balance', numeric: true, disablePadding: false, label: t`Balance` },
        { id: 'priceUSD', numeric: true, disablePadding: false, label: t`Price` },
        { id: 'txCount', numeric: true, disablePadding: false, label: t`Value` },
      ]}
      rowsPerPage={8}
      title={
        <>
          <RowWrapper style={{ padding: '16px' }}>
            <LogoWrapper style={{ backgroundColor: theme.primary1 }}>
              <WalletIcon color="#fff" />
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
      data={SampleResponse.data.tokens}
      row={CustomTableRow}
    />
  )
}
