import React, { useEffect, useState } from 'react'
import { DefaultTheme } from 'styled-components'
import { RowWrapper } from 'theme'
import { SampleHistoryResponse } from '../sample-history-response'
import Table from 'components/Table'
import styled from 'styled-components'
import TableRow from '@material-ui/core/TableRow'
import { CommonRow } from './CommonRow'
import { LiquidityRow } from './LiquidityRow'
import { t } from '@lingui/macro'
import { SearchComponent } from './SearchComponent'

export const StyledTableRow = styled(TableRow)`
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.bg3};
  }
  &:last-child {
    border-bottom: none;
  }
  td:first-child {
    padding-left: 32px;
  }
`

export const allowedTypes: { [type: string]: string } = {
  send: t`Send`,
  receive: t`Receive`,
  'add-liquidity': t`Add Liquidity`,
  swap: t`Swap`,
}

SampleHistoryResponse.data.history.sort((a: any, b: any): any => {
  return new Date(b.date.split('T')[0]).valueOf() - new Date(a.date.split('T')[0]).valueOf()
})
let currentDate: string

const CustomTableRow = (
  row: any,
  index: number,
  theme: DefaultTheme,
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
) => {
  let showDate

  if (index === 0) {
    showDate = true
    currentDate = row.date.split('T')[0]
  } else {
    if (currentDate !== row.date.split('T')[0]) {
      showDate = true
      currentDate = row.date.split('T')[0]
    } else {
      showDate = false
    }
  }

  switch (row.type) {
    case 'send':
    case 'receive':
    case 'swap':
      return <CommonRow row={row} index={index} theme={theme} handleClick={handleClick} showDate={showDate} />
    case 'liquidity':
      return <LiquidityRow row={row} index={index} theme={theme} handleClick={handleClick} showDate={showDate} />
    default:
      return <CommonRow row={row} index={index} theme={theme} handleClick={handleClick} showDate={showDate} />
  }
}

export default function HistoryTable() {
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    SampleHistoryResponse.data.history = SampleHistoryResponse.data.history.filter((row: any) => {
      return row.type.includes(searchValue)
    })
    console.log(SampleHistoryResponse.data.history)
  }, [searchValue])

  return (
    <Table
      headCells={[]}
      rowsPerPage={8}
      title={
        <>
          <RowWrapper style={{ padding: '16px' }}>
            <SearchComponent searchValue={searchValue} setSearchValue={setSearchValue} />
          </RowWrapper>
        </>
      }
      data={SampleHistoryResponse.data.history}
      row={CustomTableRow}
    />
  )
}
