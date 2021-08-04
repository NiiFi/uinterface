import React, { useEffect } from 'react'
import { Trans } from '@lingui/macro'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import { DefaultTheme } from 'styled-components'
import useTheme from 'hooks/useTheme'
import { ArrowDownIcon, ArrowUpIcon } from '../Icons'
import TableToolBar from './TableToolbar'
import { TableDataTypes } from './types'
import { TYPE } from 'theme'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    // paper: {
    //   width: '100%',
    // },
    table: {
      // minWidth: 750,
    },
    // headerWrap: {
    //   padding: '16px 16px 0 16px',
    // },
    // visuallyHidden: {
    //   border: 0,
    //   clip: 'rect(0 0 0 0)',
    //   height: 1,
    //   margin: -1,
    //   overflow: 'hidden',
    //   padding: 0,
    //   position: 'absolute',
    //   top: 20,
    //   width: 1,
    // },
  })
)

interface SimpleTableProps {
  data: Array<any> // FIXME (TableDataTypes?)
  row: (row: any, index: number) => unknown
}

export default function SimpleTable(props: SimpleTableProps) {
  // const theme = useTheme()
  const classes = useStyles()
  const [tableData, setTableData] = React.useState<Array<any>>([]) // TODO: adjust type (TableDataTypes?)

  useEffect(() => {
    setTableData(props.data)
  }, [props.data, setTableData])

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table className={classes.table}>
          <TableBody>{tableData && tableData.map(props.row)}</TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
