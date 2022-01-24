import React, { useEffect } from 'react'
import { t } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { useApiMarkets } from 'hooks/useApi'
import { TYPE, RowWrapper, BaseCurrencyView } from 'theme'
import Table from 'components/Table'
import AppBody from 'pages/AppBody'
import { shortenDecimalValues } from 'utils'

const CustomTableRow = (
  row: any,
  index: number,
  theme: DefaultTheme,
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
) => {
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}`, fontSize: '16px' }

  return (
    <TableRow
      hover
      onClick={(event) => (row?.url ? window.open(row.url, '_blank') : handleClick(event, row.id))}
      role="checkbox"
      aria-checked={false}
      tabIndex={-1}
      key={index}
      selected={false}
      style={{ cursor: 'pointer' }}
    >
      <TableCell style={{ ...rowCellStyles, paddingLeft: '30px', width: '100px' }}>{index + 1}</TableCell>
      <TableCell style={rowCellStyles} align="left">
        <RowWrapper>
          <CurrencyAvatar
            symbol={row.symbol}
            address={row.address}
            iconProps={{ width: '30', height: '30' }}
            hideSymbol={true}
          />
          <TYPE.black fontWeight={400} style={{ padding: '8px 0 0 6px' }}>
            {row.symbol}
          </TYPE.black>
        </RowWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" value={row.priceUSD} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.variableBorrowAPY)} %
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.stableBorrowAPY)} %
      </TableCell>
    </TableRow>
  )
}

export default function Borrow() {
  const { data, loader, abortController } = useApiMarkets()

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {loader ||
        (data && (
          <AppBody size="lg">
            <Table
              title={t`All Tokens`}
              data={data}
              headCells={[
                { id: 'number', numeric: true, align: 'left', disablePadding: true, label: '#' },
                { id: 'symbol', numeric: false, align: 'left', disablePadding: true, label: t`Asset` },
                { id: '', numeric: true, disablePadding: true, label: t`Available to borrow` },
                { id: 'variableBorrowAPY', numeric: true, disablePadding: false, label: t`Variable APY` },
                { id: 'stableBorrowAPY', numeric: true, disablePadding: false, label: t`Stable APY` },
              ]}
              row={CustomTableRow}
              defaultOrder={'asc'}
              defaultOrderBy={'symbol'}
            />
          </AppBody>
        ))}
    </>
  )
}
