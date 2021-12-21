import React, { useEffect } from 'react'
import useTheme from 'hooks/useTheme'
import { t, Trans } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import SwapTableDropdown from '../Dropdowns/SwapTableDropdown'
import { shortenAddress, shortenDecimalValues, formatTimeStamp } from '../../utils'
import { getFromTo } from '../../utils/transaction'
import { ExternalLink, BaseCurrencyView } from 'theme'
import { useApiTransactions } from 'hooks/useApi'
import Table from './index'
import { EXPLORER_BASE } from 'constants/general'

function mapTransactionTypeToWords(type: string, symbol1: string, symbol2: string) {
  return {
    Swap: `Swap ${symbol1} for ${symbol2}`,
    Mint: `Add ${symbol1} and ${symbol2}`,
    Burn: `Remove ${symbol1} and ${symbol2}`,
  }[type]
}

const CustomTableRow = (
  row: any,
  index: number,
  theme: DefaultTheme,
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
) => {
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}` }

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.address)}
      role="checkbox"
      aria-checked={false}
      tabIndex={-1}
      key={index}
      selected={false}
    >
      <TableCell style={rowCellStyles} align="left">
        <ExternalLink href={`${EXPLORER_BASE}tx/${row.hash}`}>
          <Trans>{mapTransactionTypeToWords(row.type, row.currency0, row.currency1)}</Trans>
        </ExternalLink>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="id" value={row.amountUSD} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.amount0)} {row.currency0}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.amount1)} {row.currency1}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <ExternalLink href={`${EXPLORER_BASE}address/${row.wallet}`}>{shortenAddress(row.wallet)}</ExternalLink>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {formatTimeStamp(`${Number(row.timestamp) * 1000}`)}
      </TableCell>
    </TableRow>
  )
}

export default function SwapTable() {
  const theme = useTheme()

  const { data, loader, abortController } = useApiTransactions()

  useEffect(() => {
    if (!data || data.length === 0) return
    data.map((item: any) => {
      const [from, to, fromValue, toValue] = getFromTo(item.type, item.token0, item.token1)
      item.currency0 = from
      item.currency1 = to
      item.amount0 = fromValue
      item.amount1 = toValue
      return item
    })
  }, [data])

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
          <Table
            title={t`Recent Transactions`}
            data={data}
            headCells={[
              { id: 'amountUSD', numeric: true, disablePadding: false, label: t`Total Value` },
              { id: 'amount0', numeric: true, disablePadding: false, label: t`Token Amount` },
              { id: 'amount1', numeric: true, disablePadding: false, label: t`Token Amount` },
              { id: 'wallet', numeric: false, disablePadding: false, label: t`Account` },
              { id: 'timestamp', numeric: false, disablePadding: false, label: t`Time` },
            ]}
            row={CustomTableRow}
            headCellsBefore={({ transactionType, onTransactionTypeChange }) => (
              <TableCell
                style={{ borderBottom: `1px solid ${theme.bg3}`, paddingLeft: '10px' }}
                key={'type'}
                align={'left'}
                padding={'none'}
                sortDirection={false}
              >
                <SwapTableDropdown
                  selectedItem={transactionType}
                  onItemSelect={(value: string) => {
                    onTransactionTypeChange(value)
                  }}
                />
              </TableCell>
            )}
            defaultOrder={'desc'}
            defaultOrderBy={'timestamp'}
          />
        ))}
    </>
  )
}
