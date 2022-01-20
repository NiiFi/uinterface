import React, { useEffect, useMemo } from 'react'
import { t } from '@lingui/macro'
import { FixedNumber } from '@ethersproject/bignumber'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { useApiMarkets } from 'hooks/useApi'
import useTheme from 'hooks/useTheme'
import { useAllTokenBalances } from 'state/wallet/hooks'
import { TYPE, RowWrapper, BaseCurrencyView } from 'theme'
import Table from 'components/Table'
import AppBody from 'pages/AppBody'
import { shortenDecimalValues } from 'utils'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'

const CustomTableRow = (
  row: any,
  index: number,
  theme: DefaultTheme,
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
) => {
  const rowCellStyles = { color: theme.black, borderBottom: `1px solid ${theme.bg3}`, fontSize: '16px' }

  return (
    <TableRow
      hover
      onClick={(event) => (row?.url ? window.open(row.url, '_blank') : handleClick(event, row.address))}
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
      <TableCell style={rowCellStyles} align="left">
        {row.balance && !FixedNumber.from(row.balance).isZero() ? (
          <>
            {shortenDecimalValues(row.balance)} <br />
            <TYPE.subHeader color="text6">
              <BaseCurrencyView type="symbol" value={row.balanceUSD} />
            </TYPE.subHeader>
          </>
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.depositAPY)} %
      </TableCell>
    </TableRow>
  )
}

export default function Deposit() {
  const theme = useTheme()
  const { data, loader, abortController } = useApiMarkets()
  const relevantTokenBalances = useAllTokenBalances()

  const handleClick = (e: React.MouseEvent<unknown>, address: string) => {
    e.preventDefault()
    console.log(address)
  }

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tableData = useMemo(() => {
    if (!data || !data.length) return

    return data.map((row) => {
      const balance = relevantTokenBalances[row.address]
        ? formatCurrencyAmount(
            relevantTokenBalances[row.address],
            relevantTokenBalances[row.address]?.currency?.decimals || 18
          )
        : 0
      return {
        ...row,
        balance,
        balanceUSD: balance ? FixedNumber.from(balance).mulUnsafe(FixedNumber.from(row.priceUSD)).toString() : 0,
      }
    })
  }, [data, relevantTokenBalances])

  return (
    <>
      {loader ||
        (tableData && (
          <AppBody size="lg">
            <Table
              title={t`All Tokens`}
              data={tableData}
              headCells={[
                { id: 'number', numeric: true, align: 'left', disablePadding: true, label: '#' },
                { id: 'symbol', numeric: false, align: 'left', disablePadding: true, label: t`Asset` },
                { id: 'balance', numeric: false, align: 'left', disablePadding: true, label: t`Wallet balance` },
                { id: 'depositAPY', numeric: true, disablePadding: false, label: t`APY` },
              ]}
              row={(row: any, index: number) => CustomTableRow(row, index, theme, handleClick)}
              defaultOrder={'desc'}
              defaultOrderBy={'balance'}
            />
          </AppBody>
        ))}
    </>
  )
}
