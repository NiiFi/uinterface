import React from 'react'
import { useHistory } from 'react-router-dom'
import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'
import { TOKEN_VALUE_CURRENCY_FORMAT } from 'constants/tokens'
import { TYPE, BaseCurrencyView } from 'theme'
import CircleSvgSrc from '../../../assets/svg/circle.svg'
import ArrowSvgSrc from '../../../assets/svg/arrow.svg'
import MaterialUiTable from '@material-ui/core/Table'
import MaterialUiBody from '@material-ui/core/TableBody'
import MaterialUiTableContainer from '@material-ui/core/TableContainer'
import { CustomNFTsTableRow } from './CustomNFTsTableRow'
import { CustomPoolsTableRow } from './CustomPoolsTableRow'
import { CustomWalletTableRow } from './CustomWalletTableRow'

import useTheme from 'hooks/useTheme'

// TODO: Move to shared

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
      renderedTable =
        data && data.map((row: any, index: number) => CustomWalletTableRow(row, index, theme, handleClick))
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
      renderedTable =
        data && data.map((row: any, index: number) => CustomWalletTableRow(row, index, theme, handleClick))
  }

  return (
    <Card>
      <CardHeader style={{ padding: '32px', justifyContent: 'start' }}>
        <SvgIconWrapper src={svgIconSrc} />
        <CardHeaderTitle>
          <TYPE.subHeader>
            <Trans>{titleName}</Trans>
          </TYPE.subHeader>
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
