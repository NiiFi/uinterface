import React, { useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'

interface SimpleTableProps {
  data: Array<any> // FIXME (TableDataTypes?)
  row: (row: any, index: number) => unknown
}

export default function SimpleTable(props: SimpleTableProps) {
  const [tableData, setTableData] = React.useState<Array<any>>([]) // TODO: adjust type (TableDataTypes?)

  useEffect(() => {
    setTableData(props.data)
  }, [props.data, setTableData])

  return (
    <div>
      <TableContainer>
        <Table>
          <TableBody>{tableData && tableData.map(props.row)}</TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
