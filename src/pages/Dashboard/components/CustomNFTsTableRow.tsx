import React from 'react'
import { DefaultTheme } from 'styled-components'
import styled from 'styled-components/macro'
import TableCell from '@material-ui/core/TableCell'
import { RowWrapper, BaseCurrencyView } from 'theme'
import { StyledTableRow } from './StyledTableRow'

const StyledNFTIcon = styled.img`
  height: 32px;
  margin: 5px 0;
`

const StyledNFTsTitle = styled.div`
  display: flex;
  padding-left: 10px;
  align-items: center;
`

export const CustomNFTsTableRow = (
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
          <StyledNFTIcon src={row.src} />
          <StyledNFTsTitle>{row.title}</StyledNFTsTitle>
        </RowWrapper>
      </TableCell>
      <TableCell style={rowCellStyles} align="right">
        <BaseCurrencyView type="symbol" value={row.value} />
        <br />
      </TableCell>
    </StyledTableRow>
  )
}
