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
import { DefaultTheme } from 'styled-components'
import useTheme from 'hooks/useTheme'
import { ArrowDownIcon, ArrowUpIcon } from '../Icons'
import TableToolBar from './TableToolbar'
import { TableDataTypes, TransactionTypes } from './types'

export type Order = 'asc' | 'desc'

export interface HeadCell {
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
}

interface RenderToolBarProps {
  onNext: (page: number) => void
  onBack: (page: number) => void
  currentPage: number
  totalPages: number
}
interface EnhancedTableProps {
  title?: any
  onClick?: (props: any) => unknown
  data: Array<TableDataTypes>
  hideHeader?: boolean
  headCells: HeadCell[]
  rowsPerPage?: number
  row: (
    row: any,
    index: number,
    theme: DefaultTheme,
    handleClick: (event: React.MouseEvent<unknown>, name: string) => void
  ) => unknown
  headCellsBefore?: (props: any) => unknown
  renderToolbar?: (props: RenderToolBarProps) => any
  showDisclaimer?: boolean
}
interface EnhancedTableHeadProps {
  classes: ReturnType<typeof useStyles>
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  order: Order
  orderBy: string
  rowCount: number
  onTransactionTypeChange: (type: any) => void
  transactionType: string
  headCells: HeadCell[]
  renderCells?: (headCell: HeadCell) => JSX.Element
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
    table: {},
    headerWrap: {
      padding: '16px 16px 0 16px',
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

export default function EnhancedTable({ hideHeader = false, ...props }: EnhancedTableProps) {
  const { renderToolbar } = props
  const theme = useTheme()
  const classes = useStyles()
  const [tableData, setTableData] = React.useState<Array<TableDataTypes>>([])
  const [transactionType, setTransactionType] = React.useState<TransactionTypes>('All')
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<string>('amountUSD')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(props.rowsPerPage || 25)
  useEffect(() => {
    setTableData(props.data)
  }, [props.data, setTableData])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    setPage(0)
  }
  const handleClick = () => {
    props.onClick && props.onClick('')
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
      <div className={classes.headerWrap}>
        <TablePagination
          rowsPerPageOptions={[1000]}
          count={1000}
          rowsPerPage={rowsPerPage}
          page={page}
          component={() =>
            renderToolbar ? (
              renderToolbar({
                onNext: (currentPage: number) => {
                  if (currentPage !== totalPages) {
                    setPage(currentPage)
                  }
                },
                onBack: (currentPage: number) => {
                  if (currentPage - 2 >= 0) {
                    setPage(currentPage - 2)
                  }
                },
                currentPage: page + 1,
                totalPages: totalPages,
              })
            ) : (
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
            )
          }
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      <TableContainer>
        <Table className={classes.table} size={'medium'} style={{ width: '100%', tableLayout: 'auto' }}>
          {!hideHeader && (
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onTransactionTypeChange={setTransactionType}
              transactionType={transactionType}
              rowCount={tableData.length}
              headCells={props.headCells}
              cellsBefore={props.headCellsBefore}
            />
          )}
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
                .map((row, index) => props.row(row, index, theme, handleClick))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
