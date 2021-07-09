import React from 'react'
import styled from 'styled-components/macro'
import { useToggleDrawer } from 'state/application/hooks'
import { ButtonEmpty } from '../Button'
import { Menu } from 'react-feather'
import useTheme from 'hooks/useTheme'

const Wrapper = styled.div`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: flex
  `};
`
const StyledButtonEmpty = styled(ButtonEmpty)`
  padding: 13px;
`
export default function ToggleDrawer() {
  const theme = useTheme()
  const { showDrawer, setDrawerToggle } = useToggleDrawer()

  return (
    <Wrapper>
      <StyledButtonEmpty onClick={() => setDrawerToggle(!showDrawer)}>
        <Menu color={theme.black} />
      </StyledButtonEmpty>
    </Wrapper>
  )
}
