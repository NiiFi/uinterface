import React, { useState, useEffect } from 'react'
import { DefaultTheme } from 'styled-components'
import useTheme from 'hooks/useTheme'
import SearchableTable from 'components/Table/SearchableTable'
import styled from 'styled-components'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { Trans, t } from '@lingui/macro'
import { format } from 'date-fns'
import {
  Wrapper as DefaultToolBarWrapper,
  PagerWrapper as DefaultToolBarPagerWrapper,
} from 'components/Table/TableToolbar'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useApiLendingTransactions } from 'hooks/useApi'
import { useActiveWeb3React } from 'hooks/web3'
import { TYPE, RowWrapper, BaseCurrencyView, ColumnWrapper } from 'theme'
import { EXPLORER_BASE } from 'constants/general'

const StyledTableRow = styled(TableRow)`
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

const DateStyledTableRow = styled(StyledTableRow)`
  border-top: none;
`

export const allowedTypes: { [type: string]: string } = {
  Repay: t`Repay`,
  Withdraw: t`Withdraw`,
  Deposit: t`Deposit`,
  Borrow: t`Borrow`,
  ReserveUsedAsCollateralDisabled: t`Use as collateral`,
  ReserveUsedAsCollateralEnabled: t`Use as collateral`,
  RebalanceStableBorrowRate: t`Rebalance stable borrow rate`,
  Swap: t`Swap borrow rate`,
}

let currentDate: string

const CustomTableRow = (
  row: any,
  index: number,
  theme: DefaultTheme,
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
) => {
  let showDate
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

  const rowCellStyles = {
    color: theme.black,
    borderBottom: 'none',
    fontSize: '1rem',
  }
  const dateRowCellStyles = {
    ...rowCellStyles,
    paddingTop: '36px',
    fontWeight: 600,
  }

  return (
    <>
      <DateStyledTableRow
        role="checkbox"
        aria-checked={false}
        tabIndex={-1}
        key={`${row.date}_${index}`}
        selected={false}
        style={{ display: showDate ? 'table-row' : 'none' }}
      >
        <TableCell style={dateRowCellStyles} align="left">
          <RowWrapper style={{ width: 'fit-content', alignItems: 'center' }}>
            {format(new Date(row.date), 'MMMM d, yyyy')}
          </RowWrapper>
        </TableCell>
      </DateStyledTableRow>
      <StyledTableRow
        hover
        onClick={(event) => handleClick(event, row.hash)}
        role="checkbox"
        aria-checked={false}
        tabIndex={-1}
        key={index}
        selected={false}
        style={{ cursor: 'pointer' }}
      >
        <TableCell style={rowCellStyles} align="left">
          <RowWrapper style={{ width: 'fit-content', alignItems: 'center' }}>
            <CurrencyAvatar
              symbol={row.symbol}
              address={row.address}
              iconProps={{ width: '30', height: '30' }}
              rootStyle={{ width: 'auto' }}
              hideSymbol={true}
            />
            <ColumnWrapper style={{ marginLeft: '5px' }}>
              <TYPE.body fontWeight={500}>{row.symbol}</TYPE.body>
            </ColumnWrapper>
          </RowWrapper>
        </TableCell>
        <TableCell style={rowCellStyles} align="left">
          <RowWrapper style={{ width: 'fit-content', alignItems: 'center' }}>
            <ColumnWrapper style={{ marginLeft: '5px' }}>
              <TYPE.body fontWeight={500}>{allowedTypes[row.type]}</TYPE.body>
              <TYPE.subHeader color={'text2'}>{format(new Date(row.date), 'HH:mm')}</TYPE.subHeader>
            </ColumnWrapper>
          </RowWrapper>
        </TableCell>
        <TableCell style={rowCellStyles}>
          <ColumnWrapper style={{ marginLeft: '5px', alignItems: 'flex-start' }}>
            {row?.rateMode && (
              <>
                {row.type === 'Borrow' && (
                  <TYPE.subHeader color={'text2'} style={{ display: 'flex' }}>
                    <Trans>Rate</Trans>
                  </TYPE.subHeader>
                )}
                <TYPE.body fontWeight={500} style={{ display: 'flex' }}>
                  {row.type === 'Borrow'
                    ? row.rateMode === '1'
                      ? t`Stable`
                      : t`Variable`
                    : row.rateMode === '1'
                    ? t`Stable` + ' → ' + t`Variable`
                    : t`Variable` + ' → ' + t`Stable`}
                </TYPE.body>
              </>
            )}
            {row.type === 'ReserveUsedAsCollateralEnabled' && t`Enabled`}
            {row.type === 'ReserveUsedAsCollateralDisabled' && t`Disabled`}
          </ColumnWrapper>
        </TableCell>
        <TableCell style={rowCellStyles} align="center">
          {row?.amount && (
            <ColumnWrapper style={{ marginLeft: '5px' }}>
              {row.amount}
              <TYPE.subHeader color={'text2'}>
                <BaseCurrencyView type="symbol" value={row.amountUSD} />
              </TYPE.subHeader>
            </ColumnWrapper>
          )}
        </TableCell>
      </StyledTableRow>
    </>
  )
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

export default function LendHistoryTable() {
  const theme = useTheme()
  const { account } = useActiveWeb3React()
  const { data, loader, abortController } = useApiLendingTransactions(account)
  const [historyData, setHistoryData] = useState<any[]>()

  function handleClick(e: React.MouseEvent<unknown>, rowId: string) {
    e.preventDefault()
    window.open(`${EXPLORER_BASE}tx/${rowId}`, '_blank')
  }

  useEffect(() => {
    if (!data || !data.length) return
    setHistoryData(data)
  }, [data])

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {loader ||
        (data && historyData && (
          <SearchableTable
            headCells={[]}
            searchLabel={t`Filter by Token, Type ...`}
            perPage={10}
            debouncedSearchChange={(value: string) => {
              setHistoryData(
                data.filter((row: any) => {
                  const regex = new RegExp(`^${value}`, 'ig')
                  return (
                    regex.test(row.type) ||
                    regex.test(row.symbol) ||
                    regex.test(row.amount) ||
                    regex.test(row.amountUSD)
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
