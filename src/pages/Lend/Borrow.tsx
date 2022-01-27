import React, { useEffect, useMemo, useState } from 'react'
import { t } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import styled, { DefaultTheme } from 'styled-components'
import { FixedNumber, formatFixed } from '@ethersproject/bignumber'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { useApiMarkets } from 'hooks/useApi'
import { useActiveWeb3React } from 'hooks/web3'
import { TYPE, RowWrapper, BaseCurrencyView, MEDIA_WIDTHS } from 'theme'
import Table from 'components/Table'
import { shortenDecimalValues, getContract } from 'utils'
import LENDING_POOL_ABI from 'abis/lending-pool.json'
import { LENDING_POOL_CONTRACT_ADDRESS, PROTOCOL_DATA_PROVIDER_ADDRESS } from 'constants/general'
import DATA_PROVIDER_ABI from 'abis/lending-protocol-data-provider.json'
import ERC20_ABI from 'abis/erc20.json'
import { Grid } from '@material-ui/core'
import { DefaultCard } from 'components/Card'
import { BodyPanel } from '../styled'
import useBreakpoint from 'hooks/useBreakpoint'

const Card = styled(DefaultCard)`
  padding: 0;
`

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

const BorrowTableRow = (
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
        {shortenDecimalValues(row.borrowed)}
      </TableCell>
    </TableRow>
  )
}

export default function Borrow() {
  const { data, loader, abortController } = useApiMarkets()
  const { account, library, chainId } = useActiveWeb3React()
  const [availableBorrowsETH, setAvailableBorrowsETH] = useState('0')
  const [myBorrows, setMyBorrows] = useState<any[]>([])
  const isSmallScreen = useBreakpoint(MEDIA_WIDTHS.upToSmall)

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

  useEffect(() => {
    if (!account || !library || !data || !data.length) return
    const contractProtocolDataProvider = getContract(
      PROTOCOL_DATA_PROVIDER_ADDRESS,
      DATA_PROVIDER_ABI,
      library,
      account
    )

    const borrows: any[] = []
    data.forEach((item, index) => {
      const tokenContract = getContract(item.address, ERC20_ABI, library, account)
      Promise.all([tokenContract.decimals(), contractProtocolDataProvider.getUserReserveData(item.address, account)])
        .then((res) => {
          const [decimals, contractData] = res
          const currentVariableDebt = contractData.currentVariableDebt.isZero()
            ? '0'
            : formatFixed(contractData.currentVariableDebt, decimals)
          const currentStableDebt = contractData.currentStableDebt.isZero()
            ? '0'
            : formatFixed(contractData.currentStableDebt, decimals)
          const borrowed = FixedNumber.from(currentVariableDebt).addUnsafe(FixedNumber.from(currentStableDebt))
          if (!borrowed.isZero()) {
            borrows.push({ address: item.address, borrowed })
          }
          if (index === data.length - 1) {
            setMyBorrows(borrows)
          }
        })
        .catch((e) => console.log(e)) // TODO: implement proper error handling
    })
  }, [account, library, chainId, data])

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

  const borrowsData = useMemo(() => {
    if (!data || !data.length) return
    const res = []
    for (const borrow of myBorrows) {
      const item = data.find((item) => item.address === borrow.address)
      if (!item) {
        continue
      }
      res.push({ ...item, borrowed: borrow.borrowed })
    }
    return res
  }, [data, myBorrows])

  return (
    <>
      {loader ||
        (tableData && borrowsData && (
          <BodyPanel>
            <Grid container direction="row" alignItems="flex-start" spacing={6}>
              <Grid item xs={isSmallScreen ? 12 : 8}>
                <Card>
                  <Table
                    title={t`All Tokens`}
                    data={tableData}
                    headCells={[
                      { id: 'symbol', numeric: false, align: 'left', disablePadding: true, label: t`Asset` },
                      { id: 'availableToBorrow', numeric: true, disablePadding: true, label: t`Available to borrow` },
                      { id: 'variableBorrowAPY', numeric: true, disablePadding: false, label: t`Variable APY` },
                      { id: 'stableBorrowAPY', numeric: true, disablePadding: false, label: t`Stable APY` },
                    ]}
                    row={CustomTableRow}
                    defaultOrder={'desc'}
                    defaultOrderBy={'availableToBorrow'}
                  />
                </Card>
              </Grid>
              <Grid item xs={isSmallScreen ? 12 : 4}>
                <Card>
                  <Table
                    title={t`My borrows`}
                    data={borrowsData}
                    headCells={[
                      { id: 'symbol', numeric: false, align: 'left', disablePadding: true, label: t`Asset` },
                      { id: 'borrowed', numeric: true, disablePadding: false, label: t`Borrowed` },
                    ]}
                    row={BorrowTableRow}
                    defaultOrder={'desc'}
                    defaultOrderBy={'symbol'}
                  />
                </Card>
              </Grid>
            </Grid>
          </BodyPanel>
        ))}
    </>
  )
}
