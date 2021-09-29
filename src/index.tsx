import '@reach/dialog/styles.css'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import React, { StrictMode } from 'react'
import { hotjar } from 'react-hotjar'
import { isMobile } from 'react-device-detect'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import Blocklist from './components/Blocklist'
import { NetworkContextName } from './constants/misc'
import { LanguageProvider } from './i18n'
import App from './pages/App'
import store from './state'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import TransactionUpdater from './state/transactions/updater'
import UserUpdater, { BaseCurrencyRatesUpdater } from './state/user/updater'
import PoolsUpdater from './state/pools/updater'
import WalletUpdater from './state/wallet/updater'
import ThemeProvider, { ThemedGlobalStyle } from './theme'
import getLibrary from './utils/getLibrary'

// TODO: apollo client should be removed as we are going to use our own API
const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2',
  cache: new InMemoryCache(),
})

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

const GOOGLE_ANALYTICS_ID: string | undefined = process.env.REACT_APP_GOOGLE_ANALYTICS_ID
if (typeof GOOGLE_ANALYTICS_ID === 'string') {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
    gaOptions: {
      storage: 'none',
      storeGac: false,
    },
  })
  ReactGA.set({
    anonymizeIp: true,
    customBrowserType: !isMobile
      ? 'desktop'
      : 'web3' in window || 'ethereum' in window
      ? 'mobileWeb3'
      : 'mobileRegular',
  })
} else {
  ReactGA.initialize('test', { testMode: true, debug: true })
}
const hotJarId = Number(process.env.REACT_APP_HOTJAR_KEY)
const hotJarVersion = Number(process.env.REACT_APP_HOTJAR_VERSION)

if (hotJarId && hotJarVersion && !isNaN(hotJarId) && !isNaN(hotJarVersion)) {
  console.log('initialize the hotjar')
  hotjar.initialize(hotJarId, hotJarVersion)
} else {
  console.error('HotJAR Id is not valid')
}

function Updaters() {
  return (
    <>
      <ListsUpdater />
      <UserUpdater />
      <BaseCurrencyRatesUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <PoolsUpdater />
      <WalletUpdater />
    </>
  )
}

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <LanguageProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
              <Blocklist>
                <ApolloProvider client={client}>
                  <Updaters />
                  <ThemeProvider>
                    <ThemedGlobalStyle />
                    <App />
                  </ThemeProvider>
                </ApolloProvider>
              </Blocklist>
            </Web3ProviderNetwork>
          </Web3ReactProvider>
        </LanguageProvider>
      </HashRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

serviceWorkerRegistration.unregister()
