import React, { useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { t, Trans } from '@lingui/macro'
import { orderBy as lodashOrderBy, get } from 'lodash'
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
import useTheme from 'hooks/useTheme'
import { ArrowDownIcon, ArrowUpIcon } from '../Icons'
import { ExternalLink } from '../../theme'
import TableToolBar from './TableToolbar'
import { shortenAddress, shortenDecimalValues, formatTimeStamp } from '../../utils'
import { TransactionListQuery, TransactionTableData, Swap, Burn, Mint, TransactionTypes } from './types'
import { SampleResponse } from './sample-response'

const BASE_URL = 'https://ropsten.etherscan.io'

function mapSwapResponseToTableData(swaps: Array<Swap>): Array<TransactionTableData> {
  /**
   * Reason for disabling the below typescript rule is to
   * avoid missing argument error.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  /**
   * Reason for disabling the below typescript rule is to
   * avoid the liquidity being part of return result. and _ need to be passed as it was
   * throwing the missing argument error
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return burns.map(({ liquidity, sender, ...rest }, _) => {
    return {
      ...rest,
      address: sender,
    }
  })
}
function mapMintResponseToTableData(mints: Array<Mint>): Array<TransactionTableData> {
  /**
   * Reason for disabling the below typescript rule is to
   * avoid the liquidity being part of return result. and _ need to be passed as it was
   * throwing the missing argument error
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return mints.map(({ liquidity, to, ...rest }, _) => {
    return {
      ...rest,
      address: to,
    }
  })
}
function mapTransactionListDataToTableData(data: TransactionListQuery): Array<TransactionTableData> {
  const tableData: Array<TransactionTableData> = []
  /**
   * Reason for disabling the below typescript rule is to
   * avoid missing argument error.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  id: string
  label: string
  numeric: boolean
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  order: Order
  orderBy: string
  rowCount: number
  onTransactionTypeChange: (type: any) => void
  transactionType: string
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const theme = useTheme()
  const headCells: HeadCell[] = [
    { id: 'amountUSD', numeric: true, disablePadding: false, label: t`Total Value` },
    { id: 'amount0', numeric: true, disablePadding: false, label: t`Token Amount` },
    { id: 'amount1', numeric: true, disablePadding: false, label: t`Token Amount` },
    { id: 'address', numeric: false, disablePadding: false, label: t`Account` },
    { id: 'transaction.timestamp', numeric: false, disablePadding: false, label: t`Time` },
  ]
  const { order, orderBy, onRequestSort, onTransactionTypeChange, transactionType } = props
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }
  return (
    <TableHead>
      <TableRow>
        <TableCell
          style={{ borderBottom: `1px solid ${theme.bg3}` }}
          key={'type'}
          align={'left'}
          padding={'none'}
          sortDirection={false}
        >
          <Select
            labelId="transaction-typeSelect"
            id="transaction-typeSelect"
            value={transactionType}
            style={{ color: theme.primary1 }}
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
            style={{ color: `${theme.text4}`, borderBottom: `1px solid ${theme.bg3}` }}
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              style={{ color: orderBy === headCell.id ? theme.primary1 : '' }}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={() =>
                order === 'desc' ? (
                  <ArrowDownIcon
                    style={{ marginLeft: '4px' }}
                    width="12px"
                    height="12px"
                    color={orderBy === headCell.id ? theme.primary1 : ''}
                  />
                ) : (
                  <ArrowUpIcon
                    style={{ marginLeft: '4px' }}
                    width="12px"
                    height="12px"
                    color={orderBy === headCell.id ? theme.primary1 : ''}
                  />
                )
              }
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
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
  const theme = useTheme()
  const [tableData, setTableData] = React.useState<Array<TransactionTableData>>([])
  const [transactionType, setTransactionType] = React.useState<TransactionTypes>('All')
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<string>('amountUSD')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)
  useEffect(() => {
    setTableData(mapTransactionListDataToTableData(SampleResponse.data))
  }, [setTableData])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
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

  const totalPages = Math.ceil(tableData.length / rowsPerPage)
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}` }
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
            title={t`Recent Transactions`}
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
        <Table className={classes.table} size={'medium'} style={{ width: '100%', tableLayout: 'auto' }}>
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
            {tableData &&
              lodashOrderBy(
                tableData,
                function (o) {
                  const dataPoint = get(o, orderBy)
                  if (orderBy === 'address') return dataPoint
                  return Number(dataPoint)
                },
                [order]
              )
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
                      <TableCell style={rowCellStyles} align="left">
                        <ExternalLink
                          href={`${BASE_URL}/tx/${'0x47cd9080afdb5fedc61347a022d9c2de0cc12ca4681a45cd4701376e87170eff'}`}
                        >
                          <Trans>
                            {mapTransactionTypeToWords(row.__typename)} {row.pair.token0.symbol} for{' '}
                            {row.pair.token1.symbol}
                          </Trans>
                        </ExternalLink>
                      </TableCell>
                      <TableCell style={rowCellStyles} align="center">
                        {shortenDecimalValues(row.amountUSD)} USD
                      </TableCell>
                      <TableCell style={rowCellStyles} align="center">
                        {shortenDecimalValues(row.amount0)} {row.pair.token0.symbol}
                      </TableCell>
                      <TableCell style={rowCellStyles} align="center">
                        {shortenDecimalValues(row.amount1)} {row.pair.token1.symbol}
                      </TableCell>
                      <TableCell style={rowCellStyles} align="center">
                        <ExternalLink href={`${BASE_URL}/address/${'0x1Ff482D42D8727258A1686102Fa4ba925C46Bc42'}`}>
                          {shortenAddress('0x1Ff482D42D8727258A1686102Fa4ba925C46Bc42')}
                        </ExternalLink>
                      </TableCell>
                      <TableCell style={rowCellStyles} align="center">
                        {formatTimeStamp(`${Number(row.transaction.timestamp) * 1000}`)}
                      </TableCell>
                    </TableRow>
                  )
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
