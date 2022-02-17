import React from 'react'
import { ButtonPrimary } from 'components/Button'
import { Trans } from '@lingui/macro'
import { ResponsiveRow } from 'components/Row'
import { useActiveWeb3React } from 'hooks/web3'
import { useWalletModalToggle } from 'state/application/hooks'
import LendHistoryTable from './components/LendHistoryTable'
import AppBody from '../../../AppBody'

export default function DashboardLendHistoryTab() {
  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()

  return (
    <>
      {account ? (
        <ResponsiveRow>
          <AppBody size="lg">
            <LendHistoryTable />
          </AppBody>
        </ResponsiveRow>
      ) : (
        <ButtonPrimary onClick={toggleWalletModal}>
          <Trans>Connect Wallet</Trans>
        </ButtonPrimary>
      )}
    </>
  )
}
