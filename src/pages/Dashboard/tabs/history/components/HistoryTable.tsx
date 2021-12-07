import React, { useState, useEffect } from 'react'
import { DefaultTheme } from 'styled-components'
import useTheme from 'hooks/useTheme'
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
import { getFromTo } from 'utils/transaction'
import { useApiUserHistory } from 'hooks/useApi'
import { useActiveWeb3React } from 'hooks/web3'
import { EXPLORER_BASE } from 'constants/general'

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
  Send: t`Send`,
  Receive: t`Receive`,
  Mint: t`Add Liquidity`,
  Burn: t`Remove Liquidity`,
  Swap: t`Swap`,
}

let currentDate: string

const CustomTableRow = (
  row: any,
  index: number,
  theme: DefaultTheme,
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
) => {
  let showDate
  const [from, to, fromValue, toValue] = getFromTo(row.type, row.token0, row.token1)
  const inverted = row.token1.symbol !== from
  row.from = {
    value: fromValue,
    symbol: from,
    address: inverted ? row.token0.address : row.token1.address,
  }
  row.to = {
    value: toValue,
    symbol: to,
    address: inverted ? row.token1.address : row.token0.address,
  }
  row.date = new Date(parseInt((row.timestamp + '').padEnd(13, '0'))).toISOString()

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
    case 'Mint':
    case 'Burn':
      return (
        <LiquidityRow key={index} row={row} index={index} theme={theme} handleClick={handleClick} showDate={showDate} />
      )
    default:
      return (
        <CommonRow key={index} row={row} index={index} theme={theme} handleClick={handleClick} showDate={showDate} />
      )
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
  const { account } = useActiveWeb3React()
  const { data, loader } = useApiUserHistory(account)
  const [historyData, setHistoryData] = useState<any[]>()

  function handleClick(e: React.MouseEvent<unknown>, rowId: string) {
    e.preventDefault()
    window.open(`${EXPLORER_BASE}tx/${rowId}`, '_blank')
  }

  useEffect(() => {
    if (!data || !data.length) return
    setHistoryData(data)
  }, [data])

  return (
    <>
      {loader ||
        (data && historyData && (
          <SearchableTable
            headCells={[]}
            searchLabel={t`Filter by Token, Protocol, Event ...`}
            perPage={10}
            debouncedSearchChange={(value: string) => {
              setHistoryData(
                data.filter((row: any) => {
                  const regex = new RegExp(`^${value}`, 'ig')
                  return (
                    regex.test(row.type) ||
                    (regex.test('add') && row.type === 'Mint') ||
                    (regex.test('remove') && row.type === 'Burn') ||
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
        ))}
    </>
  )
}
