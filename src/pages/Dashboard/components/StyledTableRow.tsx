import styled from 'styled-components/macro'
import TableRow from '@material-ui/core/TableRow'

export const StyledTableRow = styled(TableRow)`
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.bg3};
  }
`
