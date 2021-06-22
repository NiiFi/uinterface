import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { t, Trans } from '@lingui/macro'
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
interface Data {
  totalValue: number
  tokenAmountOne: number
  tokenAmountTwo: number
  walletAddress: string
  time: string
}

function createData(
  totalValue: number,
  tokenAmountOne: number,
  tokenAmountTwo: number,
  walletAddress: string,
  time: string
): Data {
  return { totalValue, tokenAmountOne, tokenAmountTwo, walletAddress, time }
}

const rows = [
  createData(1, 3.7, 67, '0x12313', '2020-05-31T13:42:47Z'),
  createData(2, 25.0, 51, '0x45453453', '2020-04-04T23:26:17Z'),
  createData(3, 16.0, 24, '0x9909098', '2019-02-09T23:57:40Z'),
  createData(4, 6.0, 24, '0x9878343', '2019-09-14T03:36:28Z'),
  createData(5, 16.0, 49, '0x098911234177', '2019-10-07T11:00:50Z'),
  createData(6, 3.2, 87, '0x1234567890', '12:00 AM'),
  // createData(7, 9.0, 37, '0x1234567890', '12:00 AM'),
  // createData(8, 0.0, 94, '0x1234567890', '12:00 AM'),
  // createData(9, 26.0, 65, '0x1234567890', '12:00 AM'),
  // createData(10, 0.2, 98, '0x1234567890', '12:00 AM'),
  // createData(318, 0, 81, '0x1234567890', '12:00 AM'),
  // createData(360, 19.0, 9, '0x1234567890', '12:00 AM'),
  // createData(437, 18.0, 63, '0x1234567890', '12:00 AM'),
  // createData(305, 3.7, 67, '0x1234567890', '12:00 AM'),
  // createData(452, 25.0, 51, '0x1234567890', '12:00 AM'),
  // createData(262, 16.0, 24, '0x1234567890', '12:00 AM'),
  // createData(159, 6.0, 24, '0x1234567890', '12:00 AM'),
  // createData(356, 16.0, 49, '0x1234567890', '12:00 AM'),
  // createData(408, 3.2, 87, '0x1234567890', '12:00 AM'),
  // createData(237, 9.0, 37, '0x1234567890', '12:00 AM'),
  // createData(375, 0.0, 94, '0x1234567890', '12:00 AM'),
  // createData(518, 26.0, 65, '0x1234567890', '12:00 AM'),
  // createData(392, 0.2, 98, '0x1234567890', '12:00 AM'),
  // createData(318, 0, 81, '0x1234567890', '12:00 AM'),
  // createData(360, 19.0, 9, '0x1234567890', '12:00 AM'),
  // createData(437, 18.0, 63, '0x1234567890', '12:00 AM'),
]

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

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
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const headCells: HeadCell[] = [
    { id: 'totalValue', numeric: true, disablePadding: false, label: t`Total Value` },
    { id: 'tokenAmountOne', numeric: true, disablePadding: false, label: t`Token Amount` },
    { id: 'tokenAmountTwo', numeric: true, disablePadding: false, label: t`Token Amount` },
    { id: 'walletAddress', numeric: false, disablePadding: false, label: t`Account` },
    { id: 'time', numeric: false, disablePadding: false, label: t`Time` },
  ]
  const { classes, order, orderBy, onRequestSort } = props
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
            value={'all'}
            onChange={() => console.log('this is running')}
          >
            <MenuItem value={'all'}>
              <Trans>All</Trans>
            </MenuItem>
            <MenuItem value={'swap'}>
              <Trans>Swap</Trans>
            </MenuItem>
            <MenuItem value={'add'}>
              <Trans>Add</Trans>
            </MenuItem>
            <MenuItem value={'Add'}>
              <Trans>Add</Trans>
            </MenuItem>
            <MenuItem value={'remove'}>
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
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('totalValue')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(3)

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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
  const totalPages = Math.ceil(rows.length / rowsPerPage)
  return (
    <div className={classes.root}>
      <TablePagination
        rowsPerPageOptions={[rows.length]}
        count={rows.length}
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
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.walletAddress)}
                    role="checkbox"
                    aria-checked={false}
                    tabIndex={-1}
                    key={row.tokenAmountOne}
                    selected={false}
                  >
                    <TableCell align="left">
                      <Trans>Swap ETH for NII</Trans>
                    </TableCell>
                    <TableCell align="center">{row.totalValue}</TableCell>
                    <TableCell align="center">{row.tokenAmountOne}</TableCell>
                    <TableCell align="center">{row.tokenAmountOne}</TableCell>
                    <TableCell align="center">{row.walletAddress}</TableCell>
                    <TableCell align="center">{row.time}</TableCell>
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
