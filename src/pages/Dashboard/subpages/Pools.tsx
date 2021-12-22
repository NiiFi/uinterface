import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { t, Trans } from '@lingui/macro'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { PoolIcon, NIILogo } from 'components/Icons'
import { TYPE, RowWrapper, ColumnWrapper, BaseCurrencyView, CircleWrapper } from 'theme'
import { useApiUserPools } from 'hooks/useApi'
import Table from 'components/Table'
import { ButtonPrimary } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import useTheme from 'hooks/useTheme'
import { useWalletModalToggle } from 'state/application/hooks'
import { StyledTableRow, LogoWrapper } from './styleds'
import { shortenDecimalValues } from 'utils'

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
        <RowWrapper>
          <div style={{ position: 'relative' }}>
            <CurrencyAvatar
              symbol={row.token0.symbol}
              address={row.token0.address}
              iconProps={{ width: '32', height: '32' }}
              containerStyle={{ zIndex: 1 }}
              hideSymbol={true}
            />
            <CurrencyAvatar
              symbol={row.token1.symbol}
              address={row.token1.address}
              iconProps={{ width: '32', height: '32' }}
              containerStyle={{ left: '22px', position: 'absolute', marginTop: '-34px' }}
              hideSymbol={true}
            />
            <CircleWrapper style={{ left: '46px', position: 'absolute', marginTop: '-36px' }}>
              <NIILogo id="poolsNiiLogo" />
            </CircleWrapper>
          </div>
          <ColumnWrapper style={{ marginLeft: '40px' }}>
            <TYPE.body>
              {row.token0.symbol} / {row.token1.symbol}
            </TYPE.body>
            <TYPE.subHeader color={'text2'}>NiiFi</TYPE.subHeader>
          </ColumnWrapper>
        </RowWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        {shortenDecimalValues(row.token0.amount)} {row.token0.symbol} / {shortenDecimalValues(row.token1.amount)}{' '}
        {row.token1.symbol}
      </TableCell>
      <TableCell style={rowCellStyles} align="center">
        <BaseCurrencyView type="symbol" value={row.amountUSD} />
      </TableCell>
    </StyledTableRow>
  )
}

export default function Pools() {
  const theme = useTheme()
  const history = useHistory()
  const toggleWalletModal = useWalletModalToggle()
  const { account } = useActiveWeb3React()
  const { data: userData, loader, abortController } = useApiUserPools(account)
  const handleClick = (e: React.MouseEvent<unknown>, rowId: string) => {
    e.preventDefault()
    history.push(`/pool/${rowId}`)
  }

  useEffect(() => {
    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {account ? (
        loader ||
        (userData && (
          <Table
            headCells={[
              { id: 'token0.symbol', numeric: false, align: 'left', disablePadding: false, label: t`Assets` },
              { id: 'token0.amount', numeric: true, disablePadding: false, label: t`Balance` },
              { id: 'amountUSD', numeric: true, disablePadding: false, label: t`Value` },
            ]}
            onClick={handleClick}
            rowsPerPage={8}
            title={
              <>
                <RowWrapper style={{ padding: '16px' }}>
                  <LogoWrapper style={{ backgroundColor: theme.error }}>
                    <PoolIcon color="#fff" opacity="0.8" />
                  </LogoWrapper>
                  <ColumnWrapper style={{ padding: '0 0 0 15px' }}>
                    <TYPE.body>
                      <Trans>Balance</Trans>
                    </TYPE.body>
                    <TYPE.mediumHeader>
                      <BaseCurrencyView type="symbol" value={userData.balanceUSD} />
                    </TYPE.mediumHeader>
                  </ColumnWrapper>
                </RowWrapper>
              </>
            }
            data={userData.data}
            row={CustomTableRow}
            defaultOrderBy={'amountUSD'}
            defaultOrder={'desc'}
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
