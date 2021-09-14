import React, { useState } from 'react'
import { DefaultTheme } from 'styled-components'
import useTheme from 'hooks/useTheme'
import { SampleHistoryResponse } from '../sample-history-response'
import SearchableTable from 'components/Table/SearchableTable'
import styled from 'styled-components'
import TableRow from '@material-ui/core/TableRow'
import { CommonRow } from './CommonRow'
import { LiquidityRow } from './LiquidityRow'
import { t } from '@lingui/macro'
import {
  Wrapper as DefaultToolBarWrapper,
  PagerWrapper as DefaultToolBarPagerWrapper,
} from 'components/Table/TableToolbar'
import { ArrowLeft, ArrowRight } from 'react-feather'

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

const HistoryToolBarPagerWrapper = styled(DefaultToolBarPagerWrapper)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    > p {
      display: none;
    }
    > svg {
      margin: 0px 8px;
      width: 1.2rem;
      height: 1.2rem;
    }
  `}
`

const HistoryTableToolbar = ({
  onNext,
  onBack,
  currentPage,
  totalPages,
}: {
  onNext: (page: number) => void
  onBack: (page: number) => void
  currentPage: number
  totalPages: number
}) => {
  return (
    <DefaultToolBarWrapper style={{ width: 'auto' }}>
      <HistoryToolBarPagerWrapper currentPage={currentPage} totalPages={totalPages}>
        <ArrowLeft onClick={() => onBack(currentPage)} />
        <p>{t`Page ${totalPages === 0 ? 0 : currentPage} of ${totalPages}`}</p>
        <ArrowRight onClick={() => onNext(currentPage)} />
      </HistoryToolBarPagerWrapper>
    </DefaultToolBarWrapper>
  )
}

export default function HistoryTable() {
  const theme = useTheme()
  const [historyData, setHistoryData] = useState<any[]>(SampleHistoryResponse.data.history)

  function handleClick(e: React.MouseEvent<unknown>, rowId: string) {
    e.preventDefault()
    console.log('ROW_ID:', rowId)
  }

  return (
    <SearchableTable
      headCells={[]}
      searchLabel={t`Filter by Token, Protocol, Event ...`}
      perPage={10}
      debouncedSearchChange={(value: string) => {
        setHistoryData(
          SampleHistoryResponse.data.history.filter((row: any) => {
            const regex = new RegExp(`^${value}`, 'ig')
            return (
              regex.test(row.type) ||
              regex.test(row.to?.symbol) ||
              regex.test(row.amount?.symbol) ||
              regex.test(row.from?.symbol)
            )
          })
        )
      }}
      renderToolbar={(props) =>
        HistoryTableToolbar({
          ...props,
        })
      }
      data={historyData}
      row={(row: any, index: number) => CustomTableRow(row, index, theme, handleClick)}
    />
  )
}
