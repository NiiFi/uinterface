import React, { useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { FixedNumber } from '@ethersproject/bignumber'
import { DefaultTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { useApiMarkets } from 'hooks/useApi'
import { DefaultCard } from 'components/Card'
import { FlexColumn } from 'components/Column'
import Table from 'components/Table'
import AppBody from 'pages/AppBody'
import { History, LocationState } from 'history'
import { TYPE, RowWrapper, BaseCurrencyView } from 'theme'
import { shortenDecimalValues } from 'utils'

const CustomTableRow = (row: any, index: number, history: History<LocationState>, theme: DefaultTheme) => {
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}`, fontSize: '16px' }

  const handleCellOnClick = (address: string) => {
    history.push(`/lend/markets/${address}`)
  }

  return (
    <TableRow
      hover
      onClick={() => handleCellOnClick(row.address)}
      role="checkbox"
      aria-checked={false}
      tabIndex={-1}
      key={index}
      selected={false}
      style={{ cursor: 'pointer' }}
    >
      <TableCell style={rowCellStyles} align="left">
        <RowWrapper>
          <CurrencyAvatar
            symbol={row.symbol}
            address={row.address}
            iconProps={{ width: '30', height: '30' }}
            hideSymbol={true}
          />
          <TYPE.black fontWeight={400} style={{ padding: '8px 0 0 6px' }}>
            {row.symbol}
          </TYPE.black>
        </RowWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" value={row.marketSize} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" value={row.totalBorrowed} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.depositAPY)} %
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.variableBorrowAPY)} %
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.stableBorrowAPY)} %
      </TableCell>
    </TableRow>
  )
}

export default function Markets() {
  const history = useHistory()
  const theme = useTheme()
  const [marketTotal, setMarketTotal] = useState(0)
  const { data: marketData, loader: marketLoader, abortController: marketAbortController } = useApiMarkets()

  useEffect(() => {
    return () => {
      marketAbortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!marketData || !marketData.length) return

    const total = marketData.reduce((sum, { marketSize }: { marketSize: string }) => {
      return FixedNumber.from(sum).addUnsafe(FixedNumber.from(marketSize)).toString()
    }, '0')

    setMarketTotal(parseFloat(total))
  }, [marketData])

  return (
    <>
      {!!marketTotal && (
        <DefaultCard width="100%" style={{ minHeight: '100px', paddingTop: '25px' }}>
          <TYPE.subHeader fontSize="16px">
            <Trans>Total Market Size</Trans>
          </TYPE.subHeader>
          <FlexColumn style={{ padding: '5px 0' }}>
            <TYPE.mediumHeader color="text1">
              <BaseCurrencyView type="symbol" value={marketTotal} />
            </TYPE.mediumHeader>
          </FlexColumn>
        </DefaultCard>
      )}
      <AppBody size="lg">
        {marketLoader ||
          (marketData && (
            <Table
              title={t`All Tokens`}
              data={marketData}
              headCells={[
                { id: 'symbol', numeric: false, align: 'left', disablePadding: false, label: t`Asset` },
                { id: 'marketSize', numeric: true, disablePadding: false, label: t`Market Size` },
                { id: 'totalBorrowed', numeric: true, disablePadding: false, label: t`Total Borrowed` },
                { id: 'depositAPY', numeric: true, disablePadding: false, label: t`Deposit APY` },
                { id: 'variableBorrowAPY', numeric: true, disablePadding: false, label: t`Variable APY` },
                { id: 'stableBorrowAPY', numeric: true, disablePadding: false, label: t`Stable APY` },
              ]}
              row={(row: any, index: number) => CustomTableRow(row, index, history, theme)}
              defaultOrder={'asc'}
              defaultOrderBy={'symbol'}
            />
          ))}
      </AppBody>
    </>
  )
}
