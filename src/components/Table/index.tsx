import React, { useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { t, Trans } from '@lingui/macro'
import { useQuery } from '@apollo/client'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import TableToolBar from './TableToolbar'
import { shortenAddress, shortenDecimalValues } from '../../utils'
import { TRANSACTION_QUERY_GQL } from './TransactionQuery'
import { TransactionListQuery, TransactionTableData, Swap, Burn, Mint, TransactionTypes } from './types'
import { SampleResponse } from './sample-response'
interface Data {
  totalValue: number
  tokenAmountOne: number
  tokenAmountTwo: number
  walletAddress: string
  time: string
}

function mapSwapResponseToTableData(swaps: Array<Swap>): Array<TransactionTableData> {
  return swaps.map(({ amount0Out, amount1In, amount1Out, amount0In, to, ...rest }, _) => {
    const amount0 = amount0In
    const amount1 = amount1In
    return {
      ...rest,
      amount0: amount0 === '0' ? amount0Out : amount0,
      address: to,
      amount1: amount1 === '0' ? amount1Out : amount1,
    }
  })
}
function mapBurnResponseToTableData(burns: Array<Burn>): Array<TransactionTableData> {
  return burns.map(({ liquidity, sender, ...rest }, _) => {
    return {
      ...rest,
      address: sender,
    }
  })
}
function mapMintResponseToTableData(mints: Array<Mint>): Array<TransactionTableData> {
  return mints.map(({ liquidity, to, ...rest }, _) => {
    return {
      ...rest,
      address: to,
    }
  })
}
function mapTransactionListDataToTableData(data: TransactionListQuery): Array<TransactionTableData> {
  const tableData: Array<TransactionTableData> = []
  data.transactions.reduce((acc: Array<TransactionTableData>, { swaps, mints, burns }, _) => {
    const mappedSwaps = mapSwapResponseToTableData(swaps)
    const mappedMints = mapMintResponseToTableData(mints)
    const mappedBurns = mapBurnResponseToTableData(burns)
    tableData.push(...mappedSwaps, ...mappedMints, ...mappedBurns)
    return tableData
  }, tableData)
  return tableData
}

function mapTransactionTypeToWords(type: string) {
  return {
    Swap: 'Swap',
    Mint: 'Add',
    Burn: 'Remove',
  }[type]
}
type Order = 'asc' | 'desc'

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  order: Order
  orderBy: string
  rowCount: number
  onTransactionTypeChange: (type: any) => void
  transactionType: string
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const headCells: HeadCell[] = [
    { id: 'totalValue', numeric: true, disablePadding: false, label: t`Total Value` },
    { id: 'tokenAmountOne', numeric: true, disablePadding: false, label: t`Token Amount` },
    { id: 'tokenAmountTwo', numeric: true, disablePadding: false, label: t`Token Amount` },
    { id: 'walletAddress', numeric: false, disablePadding: false, label: t`Account` },
    { id: 'time', numeric: false, disablePadding: false, label: t`Time` },
  ]
  const { classes, order, orderBy, onRequestSort, onTransactionTypeChange, transactionType } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }
  return (
    <TableHead>
      <TableRow>
        <TableCell key={'type'} align={'left'} padding={'none'} sortDirection={false}>
          <Select
            labelId="transaction-typeSelect"
            id="transaction-typeSelect"
            value={transactionType}
            onChange={(e: any) => {
              onTransactionTypeChange(e.target.value)
            }}
          >
            <MenuItem value={'All'}>
              <Trans>All</Trans>
            </MenuItem>
            <MenuItem value={'Swap'}>
              <Trans>Swap</Trans>
            </MenuItem>
            <MenuItem value={'Mint'}>
              <Trans>Add</Trans>
            </MenuItem>
            <MenuItem value={'Burn'}>
              <Trans>Remove</Trans>
            </MenuItem>
          </Select>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
)

export default function EnhancedTable() {
  const classes = useStyles()
  const [tableData, setTableData] = React.useState<Array<TransactionTableData>>([])
  const [transactionType, setTransactionType] = React.useState<TransactionTypes>('All')
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('totalValue')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)
  const { loading, error, data } = useQuery<TransactionListQuery>(TRANSACTION_QUERY_GQL)
  useEffect(() => {
    if (error) {
      setTableData(mapTransactionListDataToTableData(SampleResponse.data))
    }
    if (data && data.transactions) {
      setTableData(mapTransactionListDataToTableData(data))
    }
  }, [error, data, setTableData])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    setPage(0)
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage)
  const totalPages = Math.ceil(tableData.length / rowsPerPage)
  return (
    <div className={classes.root}>
      <TablePagination
        rowsPerPageOptions={[1000]}
        count={1000}
        rowsPerPage={rowsPerPage}
        page={page}
        component={() => (
          <TableToolBar
            currentPage={page + 1}
            totalPages={totalPages}
            title={t`ETH-NII Transactions`}
            onNext={(currentPage: number) => {
              if (currentPage !== totalPages) {
                setPage(currentPage)
              }
            }}
            onBack={(currentPage: number) => {
              if (currentPage - 2 >= 0) {
                setPage(currentPage - 2)
              }
            }}
          />
        )}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <TableContainer>
        <Table className={classes.table} size={'medium'}>
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            onTransactionTypeChange={setTransactionType}
            transactionType={transactionType}
            rowCount={tableData.length}
          />
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell>Loading</TableCell>
              </TableRow>
            )}
            {!loading &&
              tableData &&
              tableData
                .filter((row) => (transactionType === 'All' ? true : transactionType === row.__typename))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
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
                      <TableCell align="left">
                        <Trans>
                          {mapTransactionTypeToWords(row.__typename)} {row.pair.token0.symbol} for{' '}
                          {row.pair.token1.symbol}
                        </Trans>
                      </TableCell>
                      <TableCell align="center">{shortenDecimalValues(row.amountUSD)} US$</TableCell>
                      <TableCell align="center">
                        {shortenDecimalValues(row.amount0)} {row.pair.token0.symbol}
                      </TableCell>
                      <TableCell align="center">
                        {shortenDecimalValues(row.amount1)} {row.pair.token1.symbol}
                      </TableCell>
                      <TableCell align="center">{shortenAddress(row.address)}</TableCell>
                      <TableCell align="center">{row.transaction.timestamp}</TableCell>
                    </TableRow>
                  )
                })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
