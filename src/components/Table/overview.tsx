import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { t } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import Percent from 'components/Percent'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { useApiTokens } from 'hooks/useApi'
import { TYPE, RowWrapper, BaseCurrencyView } from '../../theme'
import Table, { Order } from './index'

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
      <TableCell style={rowCellStyles} align="center">
        {index + 1}
      </TableCell>
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
        <BaseCurrencyView type="symbol" numeralFormat={'0.[000]a'} value={row.priceUSD} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <Percent value={row.priceUSDChange} fontWeight={400} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" numeralFormat={'0.[000]a'} value={row.volumeUSD} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" numeralFormat={'0.[000]a'} value={row.tvlUSD} />
      </TableCell>
    </TableRow>
  )
}

export default function OverviewTable() {
  const { state } = useLocation<any>() // FIXME: any
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<string>()

  const { data, loader } = useApiTokens()

  useEffect(() => {
    if (state?.type !== undefined) {
      setOrderBy('priceUSDChange')
      setOrder(state.type === 'looser' ? 'asc' : 'desc')
    } else {
      setOrderBy('symbol')
      setOrder('asc')
    }
  }, [state])

  return (
    <>
      {loader ||
        (data && (
          <Table
            title={t`Top Tokens`}
            data={data}
            headCells={[
              { id: 'number', numeric: true, disablePadding: false, label: '#' },
              { id: 'symbol', numeric: false, disablePadding: false, label: t`Name` },
              { id: 'priceUSD', numeric: true, disablePadding: false, label: t`Price` },
              { id: 'priceUSDChange', numeric: true, disablePadding: false, label: t`Price Change` },
              { id: 'volumeUSD', numeric: true, disablePadding: false, label: t`Volume 24H` },
              { id: 'tvlUSD', numeric: true, disablePadding: false, label: t`TVL` },
            ]}
            row={CustomTableRow}
            defaultOrder={order}
            defaultOrderBy={orderBy}
          />
        ))}
    </>
  )
}
