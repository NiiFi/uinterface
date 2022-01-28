import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { t, Trans } from '@lingui/macro'
import { FixedNumber, formatFixed } from '@ethersproject/bignumber'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import styled, { DefaultTheme } from 'styled-components'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { useApiMarkets } from 'hooks/useApi'
import useTheme from 'hooks/useTheme'
import { useAllTokenBalances } from 'state/wallet/hooks'
import { TYPE, RowWrapper, BaseCurrencyView, MEDIA_WIDTHS, FlexColumn, FlexRowWrapper } from 'theme'
import Table from 'components/Table'
import { getContract, shortenDecimalValues } from 'utils'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import useBreakpoint from 'hooks/useBreakpoint'
import { useProtocolDataProviderContract } from 'hooks/useContract'
import ERC20_ABI from 'abis/erc20.json'
import { useActiveWeb3React } from 'hooks/web3'
import { ResponsiveRow } from 'components/Row'
import { DefaultCard } from 'components/Card'
import SimpleTable from 'components/Table/Simple'

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
      onClick={(event) => (row?.url ? window.open(row.url, '_blank') : handleClick(event, row.address))}
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

const DepositTableRow = (
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
        {shortenDecimalValues(row.deposited)}
      </TableCell>
    </TableRow>
  )
}

export default function Deposit() {
  const theme = useTheme()
  const history = useHistory()
  const { data, loader, abortController } = useApiMarkets()
  const { account, library } = useActiveWeb3React()
  const relevantTokenBalances = useAllTokenBalances()
  const [myDeposits, setMyDeposits] = useState<any[] | null>(null)
  const [totalDepositedUSD, setTotalDepositedUSD] = useState(0)
  const isSmallScreen = useBreakpoint(MEDIA_WIDTHS.upToSmall)
  const protocolDataProviderContract = useProtocolDataProviderContract()

  const handleClick = (e: React.MouseEvent<unknown>, address: string) => {
    e.preventDefault()
    history.push(`/lend/deposit/${address}`)
  }

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!protocolDataProviderContract || !library || !data || !data.length) return

    if (!account) {
      setMyDeposits([])
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
        const deposits: any[] = []
        for (let i = 0; i < res.length; i++) {
          const [decimals, contractData] = res[i]
          const deposited = formatFixed(contractData.currentATokenBalance, decimals)
          if (!FixedNumber.from(deposited).isZero()) {
            deposits.push({ address: data[i].address, deposited })
          }
        }
        setMyDeposits(deposits)
      })
      .catch((e) => console.log(e)) // TODO: implement proper error handling
  }, [protocolDataProviderContract, account, library, data])

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

  const depositsData = useMemo(() => {
    if (!data || !data.length || !myDeposits) return
    const res = []
    let totalDepositedUSD = '0'
    for (const deposit of myDeposits) {
      const item = data.find((item) => item.address === deposit.address)
      if (!item) {
        continue
      }
      totalDepositedUSD = FixedNumber.from(totalDepositedUSD)
        .addUnsafe(FixedNumber.from(deposit.deposited).mulUnsafe(FixedNumber.from(item.priceUSD)))
        .toString()

      res.push({ ...item, deposited: deposit.deposited })
    }

    setTotalDepositedUSD(totalDepositedUSD as unknown as number)

    return res.sort((a, b) => (a.deposited < b.deposited && 1) || -1)
  }, [data, myDeposits])

  return (
    <>
      {loader ||
        (tableData && depositsData && (
          <ResponsiveRow gap="2rem">
            <Card width={depositsData.length ? '66%' : '100%'}>
              <Table
                title={t`All Tokens`}
                data={tableData}
                headCells={[
                  { id: 'symbol', numeric: false, align: 'left', disablePadding: true, label: t`Asset` },
                  { id: 'balance', numeric: false, align: 'left', disablePadding: true, label: t`Wallet balance` },
                  { id: 'depositAPY', numeric: true, disablePadding: false, label: t`APY` },
                ]}
                row={(row: any, index: number) => CustomTableRow(row, index, theme, handleClick)}
                defaultOrder={'desc'}
                defaultOrderBy={'balance'}
              />
            </Card>
            {!!depositsData.length && (
              <FlexColumn style={{ width: isSmallScreen ? '100%' : '32%' }}>
                <DefaultCard>
                  <TYPE.body style={{ marginBottom: '16px' }}>
                    <Trans>My deposits</Trans>
                  </TYPE.body>
                  <SimpleTable
                    data={depositsData}
                    row={(row, index) =>
                      DepositTableRow(
                        row,
                        index,
                        {
                          color: theme.black,
                          borderBottom: 'none',
                          fontSize: '16px',
                          padding: '10px 0',
                        },
                        (address: string) => {
                          history.push(`/lend/deposit/${address}`)
                        }
                      )
                    }
                  />
                  <FlexRowWrapper style={{ borderTop: `1px solid ${theme.bg3}`, padding: '16px 0' }}>
                    <TYPE.body>
                      <Trans>Total</Trans>
                    </TYPE.body>
                    <TYPE.body>
                      <BaseCurrencyView type="symbol" value={totalDepositedUSD} />
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
