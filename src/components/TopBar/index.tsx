import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import AppBar from 'components/AppBar'
import ToggleDrawer from 'components/Header/ToggleDrawer'
import CurrencyDropdown from 'components/Dropdowns/CurrencyDropdown'
import { BarTitle, CurrencySelectWrapper } from 'theme'

const StyledAppBar = styled(AppBar)`
  padding: 0px 2rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0.5rem 0.625rem;
  `}
`

export default function TopBar({ title, showBack = true }: { title?: string; showBack?: boolean | string }) {
  const history = useHistory()
  return (
    <StyledAppBar>
      <BarTitle>
        {showBack ? (
          <ArrowLeft
            style={{ cursor: 'pointer' }}
            onClick={() => {
              console.log(showBack)
              typeof showBack === 'boolean' ? history.goBack() : history.push(showBack)
            }}
          />
        ) : (
          <ToggleDrawer />
        )}
        {title}
      </BarTitle>
      <CurrencySelectWrapper>
        <CurrencyDropdown />
      </CurrencySelectWrapper>
    </StyledAppBar>
  )
}
