import React from 'react'
import { useHistory } from 'react-router-dom'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components/macro'
import TableCell from '@material-ui/core/TableCell'
import { DefaultTheme } from 'styled-components'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import { TYPE, RowWrapper, BaseCurrencyView } from 'theme'
import CircleSvgSrc from '../../../assets/svg/circle.svg'
import ArrowSvgSrc from '../../../assets/svg/arrow.svg'
import MaterialUiTable from '@material-ui/core/Table'
import MaterialUiBody from '@material-ui/core/TableBody'
import MaterialUiTableContainer from '@material-ui/core/TableContainer'
import { CustomNFTsTableRow } from './CustomNFTsTableRow'
import { CustomPoolsTableRow } from './CustomPoolsTableRow'
import useTheme from 'hooks/useTheme'

// TODO: Move to shared
const StyledTableRow = styled(TableRow)`
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.bg3};
  }
`

const SvgIconWrapper = styled.img`
  height: 40px;
`

const ArrowWrapper = styled.div`
  height: 40px;
  position: absolute;
  right: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

const CircleSvgWrapper = styled.img`
  position: absolute;
  height: 40px;
  z-index: 1;
`

const ArrowSvgWrapper = styled.img`
  height: 10px;
  z-index: 2;
`

// TODO: Move to shared component
const Card = styled.div`
  padding: 0;
  margin-bottom: 15px;
`

// TODO: Move to shared component
const CardHeader = styled.div`
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 34px;
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding-left: 20px;
  `}
`

const CardHeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`

type CustomCardProps = {
  balance: number
  svgIconSrc: any
  data: Array<any>
  titleName: string
}

const CustomTableRow = (
  row: any,
  index: number,
  theme: DefaultTheme,
  handleClick: (event: React.MouseEvent<unknown>) => void
) => {
  const rowCellStyles = {
    color: theme.black,
    borderBottom: 'none',
    fontSize: '1rem',
  }

  return (
    <StyledTableRow
      hover
      onClick={(event) => handleClick(event)}
      role="checkbox"
      aria-checked={false}
      tabIndex={-1}
      key={index}
      selected={false}
    >
      <TableCell style={rowCellStyles} align="left">
        <RowWrapper style={{ width: 'fit-content' }}>
          <CurrencyAvatar
            symbol={row.symbol}
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
      <TableCell style={rowCellStyles} align="right">
        {index + 1} {row.symbol}
        <br />
        <TYPE.subHeader color="text6" textAlign="right">
          <BaseCurrencyView type="symbol" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} value={(index + 1) * 100} />
        </TYPE.subHeader>
      </TableCell>
    </StyledTableRow>
  )
}

export const CustomCard = ({ balance, svgIconSrc, data, titleName }: CustomCardProps) => {
  const theme = useTheme()
  const history = useHistory()
  const type: any = {
    Wallet: 'wallet',
    NFTs: 'nfts',
    'Liquidity Pools': 'pools',
    'Yield Farming': 'farm',
  }
  const handleClick = (e: any) => {
    e.preventDefault()
    history.push(`/dashboard/${type[titleName]}`)
  }
  let renderedTable

  switch (titleName) {
    case 'Wallet':
      renderedTable = data && data.map((row: any, index: number) => CustomTableRow(row, index, theme, handleClick))
      break
    case 'NFTs':
      renderedTable = data && data.map((row: any, index: number) => CustomNFTsTableRow(row, index, theme, handleClick))
      break
    case 'Liquidity Pools':
      renderedTable = data && data.map((row: any, index: number) => CustomPoolsTableRow(row, index, theme, handleClick))
      break
    case 'Yield Farming':
      renderedTable = data && data.map((row: any, index: number) => CustomPoolsTableRow(row, index, theme, handleClick))
      break
    default:
      renderedTable = data && data.map((row: any, index: number) => CustomTableRow(row, index, theme, handleClick))
  }

  // TODO: Add translation
  return (
    <Card>
      <CardHeader style={{ padding: '32px', justifyContent: 'start' }}>
        <SvgIconWrapper src={svgIconSrc} />
        <CardHeaderTitle>
          <TYPE.subHeader>{titleName}</TYPE.subHeader>
          <TYPE.mediumHeader fontSize="16px">
            <BaseCurrencyView value={balance} type="symbol" numeralFormat={TOKEN_VALUE_CURRENCY_FORMAT} />
          </TYPE.mediumHeader>
        </CardHeaderTitle>
        <ArrowWrapper onClick={(event) => handleClick(event)}>
          <CircleSvgWrapper src={CircleSvgSrc} />
          <ArrowSvgWrapper src={ArrowSvgSrc} />
        </ArrowWrapper>
      </CardHeader>
      <MaterialUiTableContainer>
        <MaterialUiTable>
          <MaterialUiBody>{renderedTable}</MaterialUiBody>
        </MaterialUiTable>
      </MaterialUiTableContainer>
    </Card>
  )
}
