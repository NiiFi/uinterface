import React, { useEffect, useMemo, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Trans, t } from '@lingui/macro'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import styled, { DefaultTheme, ThemeContext } from 'styled-components'
import { FixedNumber, formatFixed } from '@ethersproject/bignumber'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { useApiMarkets } from 'hooks/useApi'
import { useActiveWeb3React } from 'hooks/web3'
import { TYPE, RowWrapper, BaseCurrencyView, MEDIA_WIDTHS, FlexRowWrapper, FlexColumn } from 'theme'
import Table from 'components/Table'
import SimpleTable from 'components/Table/Simple'
import { shortenDecimalValues, getContract } from 'utils'
import ERC20_ABI from 'abis/erc20.json'
import { DefaultCard } from 'components/Card'
import { ResponsiveRow } from 'components/Row'
import useBreakpoint from 'hooks/useBreakpoint'
import { useLendingPoolContract, useProtocolDataProviderContract } from 'hooks/useContract'

const Card = styled(DefaultCard)`
  padding: 0;
`

const CustomTableRow = (
  row: any,
  index: number,
  theme: DefaultTheme,
  handleClick: (event: React.MouseEvent<unknown>, address: string) => void
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
  rowCellStyles: { [key: string]: string },
  handleClick: (name: string) => void
) => {
  return (
    <TableRow
      hover
      onClick={() => handleClick(row.address)}
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
      <TableCell style={rowCellStyles} align="right">
        {shortenDecimalValues(row.borrowed)}
      </TableCell>
    </TableRow>
  )
}

export default function Borrow() {
  const { data, loader, abortController } = useApiMarkets()
  const { account, library } = useActiveWeb3React()
  const [availableBorrowsETH, setAvailableBorrowsETH] = useState('0')
  const [myBorrows, setMyBorrows] = useState<any[] | null>(null)
  const [totalBorrowedUSD, setTotalBorrowedUSD] = useState(0)
  const isSmallScreen = useBreakpoint(MEDIA_WIDTHS.upToSmall)
  const lendingPoolContract = useLendingPoolContract()
  const protocolDataProviderContract = useProtocolDataProviderContract()
  const theme = useContext(ThemeContext)
  const history = useHistory()

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!account || !lendingPoolContract) return
    lendingPoolContract
      .getUserAccountData(account)
      .then((pool: any) => {
        setAvailableBorrowsETH(formatFixed(pool.availableBorrowsETH, 18))
      })
      .catch((e: any) => console.log(e)) // TODO: implement proper error handling
  }, [account, lendingPoolContract])

  useEffect(() => {
    if (!protocolDataProviderContract || !library || !data || !data.length) return

    if (!account) {
      setMyBorrows([])
      return
    }

    const promises = []
    for (const item of data) {
      const tokenContract = getContract(item.address, ERC20_ABI, library, account)
      promises.push(
        Promise.all([tokenContract.decimals(), protocolDataProviderContract.getUserReserveData(item.address, account)])
      )
    }
    Promise.all(promises)
      .then((res) => {
        const borrows: any[] = []
        for (let i = 0; i < res.length; i++) {
          const [decimals, contractData] = res[i]
          const currentVariableDebt = formatFixed(contractData.currentVariableDebt, decimals)
          const currentStableDebt = formatFixed(contractData.currentStableDebt, decimals)
          const borrowed = FixedNumber.from(currentVariableDebt).addUnsafe(FixedNumber.from(currentStableDebt))
          if (!borrowed.isZero()) {
            borrows.push({ address: data[i].address, borrowed })
          }
        }
        setMyBorrows(borrows)
      })
      .catch((e) => console.log(e)) // TODO: implement proper error handling
  }, [protocolDataProviderContract, account, library, data])

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
    if (!data || !data.length || !myBorrows) return
    const res = []
    let totalBorrowedUSD = '0'
    for (const borrow of myBorrows) {
      const item = data.find((item) => item.address === borrow.address)
      if (!item) {
        continue
      }
      totalBorrowedUSD = FixedNumber.from(totalBorrowedUSD)
        .addUnsafe(borrow.borrowed.mulUnsafe(FixedNumber.from(item.priceUSD)))
        .toString()

      res.push({ ...item, borrowed: borrow.borrowed })
    }

    setTotalBorrowedUSD(totalBorrowedUSD as unknown as number)

    return res.sort((a, b) => (a.borrowed < b.borrowed && 1) || -1)
  }, [data, myBorrows])

  return (
    <>
      {loader ||
        (tableData && borrowsData && (
          <ResponsiveRow gap="2rem">
            <Card width={borrowsData.length ? '66%' : '100%'}>
              <Table
                title={t`All Tokens`}
                data={tableData}
                headCells={[
                  { id: 'symbol', numeric: false, align: 'left', disablePadding: true, label: t`Asset` },
                  { id: 'availableToBorrow', numeric: true, disablePadding: true, label: t`Available to borrow` },
                  { id: 'variableBorrowAPY', numeric: true, disablePadding: false, label: t`Variable APY` },
                  { id: 'stableBorrowAPY', numeric: true, disablePadding: false, label: t`Stable APY` },
                ]}
                row={(row, index) =>
                  CustomTableRow(row, index, theme, () => {
                    history.push(`/lend/borrow/${row.address}`)
                  })
                }
                defaultOrder={'desc'}
                defaultOrderBy={'availableToBorrow'}
              />
            </Card>
            {!!borrowsData.length && (
              <FlexColumn style={{ width: isSmallScreen ? '100%' : '32%' }}>
                <DefaultCard>
                  <TYPE.body style={{ marginBottom: '16px' }}>
                    <Trans>My borrows</Trans>
                  </TYPE.body>
                  <SimpleTable
                    data={borrowsData}
                    row={(row, index) =>
                      BorrowTableRow(
                        row,
                        index,
                        {
                          color: theme.black,
                          borderBottom: 'none',
                          fontSize: '16px',
                          padding: '10px 0',
                        },
                        (address: string) => {
                          history.push(`/lend/borrow/${address}`)
                        }
                      )
                    }
                  />
                  <FlexRowWrapper style={{ borderTop: `1px solid ${theme.bg3}`, padding: '16px 0' }}>
                    <TYPE.body>
                      <Trans>Total</Trans>
                    </TYPE.body>
                    <TYPE.body>
                      <BaseCurrencyView type="symbol" value={totalBorrowedUSD} />
                    </TYPE.body>
                  </FlexRowWrapper>
                </DefaultCard>
              </FlexColumn>
            )}
          </ResponsiveRow>
        ))}
    </>
  )
}
