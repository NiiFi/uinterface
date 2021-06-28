import React from 'react'
import styled from 'styled-components/macro'
import { useToggleDrawer } from 'state/application/hooks'
import { ButtonEmpty } from '../Button'
import { Menu } from 'react-feather'

const Wrapper = styled.div`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: flex
    border-bottom: 1px solid ${({ theme }) => theme.bg3}
  `};
`
export default function ToggleDrawer() {
  const { showDrawer, setDrawerToggle } = useToggleDrawer()

  return (
    <Wrapper>
      <ButtonEmpty onClick={() => setDrawerToggle(!showDrawer)}>
        <Menu color="black" />
      </ButtonEmpty>
    </Wrapper>
  )
}
