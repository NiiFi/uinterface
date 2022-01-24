import React, { useEffect, useMemo, useState } from 'react'
import { t } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import { FixedNumber, formatFixed } from '@ethersproject/bignumber'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { useApiMarkets } from 'hooks/useApi'
import { useActiveWeb3React } from 'hooks/web3'
import { TYPE, RowWrapper, BaseCurrencyView } from 'theme'
import Table from 'components/Table'
import AppBody from 'pages/AppBody'
import { shortenDecimalValues, getContract } from 'utils'
import LENDING_POOL_ABI from 'abis/lending-pool.json'
import { LENDING_POOL_CONTRACT_ADDRESS } from 'constants/general'

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
      onClick={(event) => (row?.url ? window.open(row.url, '_blank') : handleClick(event, row.id))}
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
        {!FixedNumber.from(row.availableToBorrow).isZero() ? (
          <>
            {shortenDecimalValues(row.availableToBorrow)} <br />
            <TYPE.subHeader color="text6">
              <BaseCurrencyView type="symbol" value={row.availableToBorrowUSD} />
            </TYPE.subHeader>
          </>
        ) : (
          '-'
        )}
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

export default function Borrow() {
  const { data, loader, abortController } = useApiMarkets()
  const { account, library, chainId } = useActiveWeb3React()
  const [availableBorrowsETH, setAvailableBorrowsETH] = useState('0')

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!account || !library) return
    const lendingPoolContract = getContract(LENDING_POOL_CONTRACT_ADDRESS, LENDING_POOL_ABI, library, account)
    lendingPoolContract
      .getUserAccountData(account)
      .then((pool: any) => {
        setAvailableBorrowsETH(formatFixed(pool.availableBorrowsETH, 18))
      })
      .catch((e: any) => console.log(e)) // TODO: implement proper error handling
  }, [account, library, chainId])

  const tableData = useMemo(() => {
    if (!data || !data.length || (account && !availableBorrowsETH)) return

    return data.map((item) => {
      const availableToBorrowGeneral = FixedNumber.from(availableBorrowsETH)
        .divUnsafe(FixedNumber.from(item.priceETH))
        .mulUnsafe(FixedNumber.from('0.99'))
        .toString()

      const availableToBorrow = FixedNumber.from(availableToBorrowGeneral)
        .subUnsafe(FixedNumber.from(item.availableLiquidity))
        .isNegative()
        ? availableToBorrowGeneral
        : item.availableLiquidity

      const availableToBorrowUSD = availableToBorrow
        ? FixedNumber.from(availableToBorrow).mulUnsafe(FixedNumber.from(item.priceUSD)).toString()
        : 0

      return {
        ...item,
        availableToBorrow,
        availableToBorrowUSD,
      }
    })
  }, [data, account, availableBorrowsETH])

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
                { id: 'availableToBorrow', numeric: true, disablePadding: true, label: t`Available to borrow` },
                { id: 'variableBorrowAPY', numeric: true, disablePadding: false, label: t`Variable APY` },
                { id: 'stableBorrowAPY', numeric: true, disablePadding: false, label: t`Stable APY` },
              ]}
              row={CustomTableRow}
              defaultOrder={'desc'}
              defaultOrderBy={'availableToBorrow'}
            />
          </AppBody>
        ))}
    </>
  )
}
