import React, { useEffect } from 'react'
import { t, Trans } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
import Percent from 'components/Percent'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { useApiTokens, useApiStatsLocal } from 'hooks/useApi'
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
      <TableCell style={{ ...rowCellStyles, paddingLeft: '30px', width: '100px' }}>{index + 1}</TableCell>
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
        <BaseCurrencyView type="symbol" value={row.priceUSD} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" value={row.priceUSD} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.priceUSDChange)} %
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.volumeUSD)} %
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.volumeUSD)} %
      </TableCell>
    </TableRow>
  )
}

export default function Markets() {
  const history = useHistory()
  const theme = useTheme()
  const { data: marketData, loader: marketLoader, abortController: marketAbortController } = useApiTokens()
  const { data: statsData, loader: statsLoader, abortController: statsAbortController } = useApiStatsLocal()

  useEffect(() => {
    return () => {
      marketAbortController.abort()
      statsAbortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {statsLoader ||
        (statsData && (
          <DefaultCard width="100%" style={{ minHeight: '100px', paddingTop: '25px' }}>
            <TYPE.subHeader fontSize="16px">
              <Trans>Total Market Size</Trans>
            </TYPE.subHeader>
            <FlexColumn style={{ padding: '5px 0' }}>
              <TYPE.mediumHeader color="text1">
                <BaseCurrencyView type="symbol" value={statsData.volume_24} />
              </TYPE.mediumHeader>
              <Percent value={statsData.fees_24} fontWeight={400} />
            </FlexColumn>
          </DefaultCard>
        ))}
      <AppBody size="lg">
        {marketLoader ||
          (marketData && (
            <Table
              title={t`All Tokens`}
              data={marketData}
              headCells={[
                { id: 'number', numeric: true, align: 'left', disablePadding: true, label: '#' },
                { id: 'symbol', numeric: false, align: 'left', disablePadding: false, label: t`Asset` },
                { id: 'priceUSD', numeric: true, disablePadding: false, label: t`Market Size` },
                { id: 'priceUSD1', numeric: true, disablePadding: false, label: t`Total Borrowed` },
                { id: 'priceUSDChange', numeric: true, disablePadding: false, label: t`Deposit APY` },
                { id: 'volumeUSD1', numeric: true, disablePadding: false, label: t`Variable APY` },
                { id: 'volumeUSD', numeric: true, disablePadding: false, label: t`Stable APY` },
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
