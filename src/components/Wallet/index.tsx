import React from 'react'
import { Trans } from '@lingui/macro'
import { ButtonPrimary } from 'components/Button'
import { useWalletModalToggle } from 'state/application/hooks'

export function WalletConnect() {
  const toggleWalletModal = useWalletModalToggle()
  return (
    <ButtonPrimary onClick={toggleWalletModal}>
      <Trans>Connect Wallet</Trans>
    </ButtonPrimary>
  )
}
