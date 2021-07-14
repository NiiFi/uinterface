import React, { useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { orderBy as lodashOrderBy, get } from 'lodash'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import useTheme from 'hooks/useTheme'
import { ArrowDownIcon, ArrowUpIcon } from '../Icons'
import TableToolBar from './TableToolbar'
import { TransactionTableData, TransactionTypes } from './types'

export type Order = 'asc' | 'desc'

export interface HeadCell {
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
}

interface EnhancedTableProps {
  title: string
  data: Array<TransactionTableData>
  headCells: HeadCell[]
  row: (row: any, index: number, handleClick: (event: React.MouseEvent<unknown>, name: string) => void) => unknown
  headCellsBefore?: (props: any) => unknown
  showDisclaimer?: boolean
}
interface EnhancedTableHeadProps {
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  order: Order
  orderBy: string
  rowCount: number
  onTransactionTypeChange: (type: any) => void
  transactionType: string
  headCells: HeadCell[]
  renderCells?: (headCell: HeadCell) => unknown
  cellsBefore?: (props: any) => unknown
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const theme = useTheme()
  const { order, orderBy, onRequestSort, headCells, cellsBefore } = props
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  const renderCells =
    props.renderCells ||
    ((headCell: HeadCell) => {
      return (
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
      )
    })

  return (
    <TableHead>
      <TableRow>
        {cellsBefore && cellsBefore(props)}
        {headCells.map(renderCells)}
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

export default function EnhancedTable(props: EnhancedTableProps) {
  const classes = useStyles()
  const [tableData, setTableData] = React.useState<Array<TransactionTableData>>([])
  const [transactionType, setTransactionType] = React.useState<TransactionTypes>('All')
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<string>('amountUSD')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)
  useEffect(() => {
    setTableData(props.data)
  }, [props.data, setTableData])

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
            title={props.title}
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
            showDisclaimer={props.showDisclaimer}
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
            headCells={props.headCells}
            cellsBefore={props.headCellsBefore}
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
                .map((row, index) => props.row(row, index, handleClick))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
