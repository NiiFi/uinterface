import styled from 'styled-components/macro'
import AppBar from 'components/AppBar'

export const StandardPageWrapper = styled.div`
  padding-top: 160px;
  width: 100%;
`
export const BodyPanel = styled.div`
  box-sizing: border-box;
  padding: 2rem;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0.625rem;
  `}
`
export const CustomAppBar = styled(AppBar)`
  padding: 0px 2rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0.5rem 0.625rem;
  `}
`
