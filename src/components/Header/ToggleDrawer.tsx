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
    border-bottom: 1px solid ${({ theme }) => theme.bg3}
  `};
`
export default function ToggleDrawer() {
  const theme = useTheme()
  const { showDrawer, setDrawerToggle } = useToggleDrawer()

  return (
    <Wrapper>
      <ButtonEmpty onClick={() => setDrawerToggle(!showDrawer)}>
        <Menu color={theme.black} />
      </ButtonEmpty>
    </Wrapper>
  )
}
