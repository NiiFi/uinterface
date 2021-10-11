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

function mapTransactionTypeToWords(type: string) {
  return {
    Swap: 'Swap',
    Mint: 'Add',
    Burn: 'Remove',
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
      onClick={(event) => handleClick(event, row.transaction.id)}
      role="checkbox"
      aria-checked={false}
      tabIndex={-1}
      key={index}
      selected={false}
    >
      <TableCell style={rowCellStyles} align="left">
        <ExternalLink href={`${BASE_URL}/tx/${'0x47cd9080afdb5fedc61347a022d9c2de0cc12ca4681a45cd4701376e87170eff'}`}>
          <Trans>
            {mapTransactionTypeToWords(row.type)} {row.token1Symbol} for {row.token2Symbol}
          </Trans>
        </ExternalLink>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="id" value={row.amountUSD} numeralFormat={'0.[000]a'} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.amount0)} {row.token1Symbol}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.amount1)} {row.token2Symbol}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <ExternalLink href={`${BASE_URL}/address/${row.address}`}>{shortenAddress(row.address)}</ExternalLink>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {formatTimeStamp(`${Number(row?.timestamp || 1) * 1000}`)}
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
            showDisclaimer={true}
          />
        ))}
    </>
  )
}
