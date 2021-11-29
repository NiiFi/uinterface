import React from 'react'
import useTheme from 'hooks/useTheme'
import { t, Trans } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import SwapTableDropdown from '../Dropdowns/SwapTableDropdown'
import { shortenAddress, shortenDecimalValues, formatTimeStamp } from '../../utils'
import { ExternalLink, BaseCurrencyView } from 'theme'
import { useApiTransactions } from 'hooks/useApi'
import Table from './index'

const BASE_URL = process.env.REACT_APP_EXPLORER || 'https://explorer.testnet.nahmii.io/'

function mapTransactionTypeToWords(type: string, symbol1: string, symbol2: string) {
  return {
    Swap: `Swap ${symbol1} for ${symbol2}`,
    Mint: `Add ${symbol1} and ${symbol2}`,
    Burn: `Remove ${symbol1} and ${symbol2}`,
  }[type]
}

function getFromTo(type: string, token0: any, token1: any) {
  switch (type) {
    case 'Swap':
      if (!parseFloat(token0.amountIn)) {
        return [token1.symbol, token0.symbol, token1.amountIn, token0.amountOut]
      }
      break
    case 'Mint':
      return [token0.symbol, token1.symbol, token0.amountIn, token1.amountIn]
    case 'Burn':
      return [token0.symbol, token1.symbol, token0.amountOut, token1.amountOut]
  }

  return [token0.symbol, token1.symbol, token0.amountIn, token1.amountOut]
}

const CustomTableRow = (
  row: any,
  index: number,
  theme: DefaultTheme,
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
) => {
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}` }

  const [from, to, fromValue, toValue] = getFromTo(row.type, row.token0, row.token1)

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
        <ExternalLink href={`${BASE_URL}/tx/${row.hash}`}>
          <Trans>{mapTransactionTypeToWords(row.type, from, to)}</Trans>
        </ExternalLink>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="id" value={row.amountUSD} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(fromValue)} {from}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(toValue)} {to}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <ExternalLink href={`${BASE_URL}/address/${row.wallet}`}>{shortenAddress(row.wallet)}</ExternalLink>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {formatTimeStamp(`${Number(row.timestamp) * 1000}`)}
      </TableCell>
    </TableRow>
  )
}

export default function SwapTable() {
  const theme = useTheme()

  const { data, loader } = useApiTransactions()

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
              { id: 'address', numeric: false, disablePadding: false, label: t`Account` },
              { id: 'transaction.timestamp', numeric: false, disablePadding: false, label: t`Time` },
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
          />
        ))}
    </>
  )
}
