import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import { NIILogo } from 'components/Icons'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { shortenDecimalValues } from '../../utils'
import { TYPE, RowWrapper, ColumnWrapper, CircleWrapper, BaseCurrencyView } from '../../theme'
import { useApiPools } from 'hooks/useApi'
import SearchableTable, { Order } from './SearchableTable'
import { PoolTableData } from '../Table/types'
import { ButtonOutlined } from 'components/Button'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Wrapper as DefaultToolBarWrapper, PagerWrapper as DefaultToolBarPagerWrapper } from './TableToolbar'
import { History, LocationState } from 'history'
import QuestionHelper from 'components/QuestionHelper'
import { AutoRow } from 'components/Row'

const TooltipRow = styled(AutoRow)`
  line-height: 1.75rem;
  color: ${({ theme }) => theme.text1};
`

const CustomTableRow = (row: any, index: number, history: History<LocationState>, theme: DefaultTheme) => {
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}`, cursor: 'pointer' }

  const handleCellOnClick = (id: string) => {
    history.push(`/pool/${id}`)
  }

  row.apyTrading = parseFloat(row.apyTrading)
  row.apyNii = parseFloat(row.apyNii)
  row.apyNiifi = parseFloat(row.apyNiifi)

  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={false}
      tabIndex={-1}
      key={index}
      selected={false}
      onClick={() => handleCellOnClick(row.address)}
    >
      <TableCell style={rowCellStyles} align="left">
        <RowWrapper>
          <div style={{ position: 'relative' }}>
            <CurrencyAvatar
              symbol=""
              address={row.token1.address}
              iconProps={{ width: '32', height: '32' }}
              containerStyle={{ zIndex: 1 }}
              hideSymbol={true}
            />
            <CurrencyAvatar
              symbol=""
              address={row.token2.address}
              iconProps={{ width: '32', height: '32' }}
              containerStyle={{ left: '18px', position: 'absolute', marginTop: '-34px' }}
              hideSymbol={true}
            />
            <CircleWrapper style={{ left: '42px', position: 'absolute', marginTop: '-36px' }}>
              <NIILogo />
            </CircleWrapper>
          </div>
          <ColumnWrapper style={{ marginLeft: '42px' }}>
            <div>
              {row.token1.symbol} / {row.token2.symbol}
            </div>
            <TYPE.small color={'text2'}>NiiFi</TYPE.small>
          </ColumnWrapper>
        </RowWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" value={row.liquidity} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <ColumnWrapper>
          <AutoRow>
            <div>{shortenDecimalValues(row.apy)} %</div>
            {(!!row.apyTrading || !!row.apyNii || !!row.apyNiifi) && (
              <QuestionHelper
                text={
                  <>
                    {!!row.apyTrading && (
                      <TooltipRow>
                        <Trans>Trading APY</Trans>:&nbsp;
                        <>{shortenDecimalValues(row.apyTrading)} %</>
                      </TooltipRow>
                    )}
                    {!!row.apyNii && (
                      <TooltipRow>
                        <Trans>NII Liquidity Mining APY</Trans>:&nbsp;
                        <>{shortenDecimalValues(row.apyNii)} %</>
                      </TooltipRow>
                    )}
                    {!!row.apyNiifi && (
                      <TooltipRow>
                        <Trans>NIIFI Liquidity Mining APY</Trans>:&nbsp;
                        <>{shortenDecimalValues(row.apyNiifi)} %</>
                      </TooltipRow>
                    )}
                  </>
                }
                size={320}
              />
            )}
          </AutoRow>
        </ColumnWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <ButtonOutlined style={{ fontSize: '14px' }} padding={'10px 14px'}>
          <Trans>Add Liquidity</Trans>
        </ButtonOutlined>
      </TableCell>
    </TableRow>
  )
}

const PoolToolBarPagerWrapper = styled(DefaultToolBarPagerWrapper)`
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

const PoolTableToolbar = ({
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
      <PoolToolBarPagerWrapper currentPage={currentPage} totalPages={totalPages}>
        <ArrowLeft onClick={() => onBack(currentPage)} />
        <p>{t`Page ${totalPages === 0 ? 0 : currentPage} of ${totalPages}`}</p>
        <ArrowRight onClick={() => onNext(currentPage)} />
      </PoolToolBarPagerWrapper>
    </DefaultToolBarWrapper>
  )
}
export default function PoolsTable() {
  const history = useHistory()
  const theme = useTheme()
  const { state } = useLocation<any>() // FIXME: any
  const { data, loader } = useApiPools()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<string>()
  const [pools, setPools] = useState<PoolTableData[]>()

  useEffect(() => {
    if (!data || data.length === 0) return
    setPools(data)
  }, [data])

  useEffect(() => {
    setOrderBy('apy')
    setOrder(state?.type === 'losers' ? 'asc' : 'desc')
  }, [state])

  return (
    <>
      {loader ||
        (data && pools && (
          <SearchableTable
            title={''}
            data={pools}
            searchLabel={t`Filter by token, protocol, ...`}
            debouncedSearchChange={(value: string) => {
              setPools(
                data.filter((pool: any) => {
                  const regex = new RegExp(`^${value}`, 'ig')
                  return (
                    regex.test(pool.address) ||
                    regex.test(pool.token1.symbol) ||
                    regex.test(pool.token2.symbol) ||
                    regex.test(pool.token1.address) ||
                    regex.test(pool.token2.address)
                  )
                })
              )
            }}
            headCells={[
              { id: 'token0Address', numeric: false, disablePadding: false, label: t`Available Pools` },
              { id: 'liquidity', numeric: true, disablePadding: false, label: t`TVL` },
              { id: 'apy', numeric: false, disablePadding: false, label: t`APY` },
              { id: '', numeric: false, disablePadding: false, label: '' },
            ]}
            renderToolbar={(props) =>
              PoolTableToolbar({
                ...props,
              })
            }
            row={(row: any, index: number) => CustomTableRow(row, index, history, theme)}
            defaultOrder={order}
            defaultOrderBy={orderBy}
          />
        ))}
    </>
  )
}
