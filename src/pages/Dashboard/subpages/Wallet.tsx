import React from 'react'
import { t, Trans } from '@lingui/macro'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { WalletIcon } from 'components/Icons'
import { TYPE, RowWrapper, ColumnWrapper, BaseCurrencyView } from 'theme'
import Table from 'components/Table'
import { ButtonPrimary } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import useTheme from 'hooks/useTheme'
import { useWalletModalToggle } from 'state/application/hooks'
import { StyledTableRow, LogoWrapper } from './styleds'
import { shortenDecimalValues } from 'utils'
import { EXPLORER_BASE } from 'constants/general'
import { useWalletData } from '../'

const CustomTableRow = (
  row: any,
  index: number,
  theme: DefaultTheme,
  handleClick: (event: React.MouseEvent<unknown>, name: string) => void
) => {
  const rowCellStyles = {
    color: theme.black,
    borderBottom: 'none',
    fontSize: '1rem',
  }

  return (
    <StyledTableRow
      hover
      onClick={(event) => handleClick(event, row.address)}
      role="checkbox"
      aria-checked={false}
      tabIndex={-1}
      key={index}
      selected={false}
    >
      <TableCell style={rowCellStyles} align="left">
        <RowWrapper style={{ width: 'fit-content' }}>
          <CurrencyAvatar
            symbol=""
            address={row.address}
            iconProps={{ width: '30', height: '30' }}
            rootStyle={{ width: 'auto' }}
            hideSymbol={true}
          />
          <TYPE.black fontWeight={400} style={{ padding: '8px 0 0 6px', width: 'fit-content' }}>
            {row.symbol}
          </TYPE.black>
        </RowWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.balance)}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" value={row.price} />
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" value={row.total} />
      </TableCell>
    </StyledTableRow>
  )
}

export default function Wallet() {
  const theme = useTheme()
  const toggleWalletModal = useWalletModalToggle()
  const { account } = useActiveWeb3React()
  const userAssets = useWalletData()

  const handleClick = (e: React.MouseEvent<unknown>, address: string) => {
    e.preventDefault()
    window.open(`${EXPLORER_BASE}address/${address}`, '_blank')
  }

  return (
    <>
      {account ? (
        userAssets?.loader ||
        (userAssets?.data && (
          <Table
            headCells={[
              { id: 'symbol', numeric: false, align: 'left', disablePadding: false, label: t`Assets` },
              { id: 'balance', numeric: true, disablePadding: false, label: t`Balance` },
              { id: 'price', numeric: true, disablePadding: false, label: t`Price` },
              { id: 'total', numeric: true, disablePadding: false, label: t`Value` },
            ]}
            rowsPerPage={8}
            title={
              <>
                <RowWrapper style={{ padding: '16px' }}>
                  <LogoWrapper style={{ backgroundColor: theme.primary1 }}>
                    <WalletIcon color="#fff" />
                  </LogoWrapper>
                  <ColumnWrapper style={{ padding: '0 0 0 15px' }}>
                    <TYPE.body>
                      <Trans>Balance</Trans>
                    </TYPE.body>
                    <TYPE.mediumHeader>
                      <BaseCurrencyView type="symbol" value={userAssets.balanceUSD} />
                    </TYPE.mediumHeader>
                  </ColumnWrapper>
                </RowWrapper>
              </>
            }
            data={userAssets.data}
            row={(row: any, index: number) => CustomTableRow(row, index, theme, handleClick)}
          />
        ))
      ) : (
        <ButtonPrimary onClick={toggleWalletModal}>
          <Trans>Connect Wallet</Trans>
        </ButtonPrimary>
      )}
    </>
  )
}
