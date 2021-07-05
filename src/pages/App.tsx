import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import Header from '../components/Header/Sidebar'
import Polling from '../components/Header/Polling'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import ErrorBoundary from '../components/ErrorBoundary'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import { useToggleDrawer } from 'state/application/hooks'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'

const AppWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg6};
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 360px);
  align-items: flex-start;
  height: 100vh;
  overflow: scroll;
  flex: 1;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 5px;
    width: 100vw;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 360px;
  justify-content: space-between;
  overflow: hidden;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 0px;
    left: -300px;
    transition: width .3s cubic-bezier(0.25, 0.1, 0.25, 1);
    &.active {
      position: relative;
      z-index: 21001;
      left: 0px;
      width: 300px;
      transition: width .5s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
  `}
`
const HeaderWrapperBackDrop = styled.div`
  width: 360px;
  height: auto;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 0px;
    left: -300px;
    background-color: rgba(0, 0, 0, 0.3);
    &.active {
      position: absolute;
      z-index: 21000;
      left: 0px;
      width: 100vw;
    }
  `}
`
const Marginer = styled.div`
  margin-top: 5rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-top: 0.5rem;
  `}
`

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle} />
}

export default function App() {
  const { showDrawer, setDrawerToggle } = useToggleDrawer()
  return (
    <ErrorBoundary>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      <AppWrapper>
        <HeaderWrapperBackDrop className={showDrawer ? 'active' : ''} onClick={() => setDrawerToggle(false)}>
          <HeaderWrapper className={showDrawer ? 'active' : ''}>
            <Header />
          </HeaderWrapper>
        </HeaderWrapperBackDrop>
        <BodyWrapper>
          <Popups />
          <Polling />
          <TopLevelModals />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
              <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
              <Route exact strict path="/swap" component={Swap} />
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </BodyWrapper>
      </AppWrapper>
    </ErrorBoundary>
  )
}
