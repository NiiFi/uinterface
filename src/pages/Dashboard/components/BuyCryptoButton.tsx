import React from 'react'
import { ButtonProcess, ButtonSuccess, ButtonPrimaryDashboard } from 'components/Button'
import { useBuyTokenModalToggle, useDepositToNahmiiModalToggle } from 'state/application/hooks'
import useFakeBuyTokenFlow from 'hooks/useFakeBuyTokenFlow'
import { Trans } from '@lingui/macro'

export const BuyCryptoButton = () => {
  const toggleBuyTokenModal = useBuyTokenModalToggle()
  const toggleDepositToNahmiiModal = useDepositToNahmiiModalToggle()
  const { buyState } = useFakeBuyTokenFlow()

  return (
    <>
      {buyState === 'buy' && (
        <ButtonPrimaryDashboard
          fontSize={'0.875rem'}
          onClick={toggleBuyTokenModal}
          style={{ textTransform: 'uppercase' }}
        >
          {/* TODO: Add Trans */}
          <Trans>Buy Crypto</Trans>
        </ButtonPrimaryDashboard>
      )}
      {buyState === 'process' && (
        <ButtonProcess fontSize={'0.875rem'} style={{ textTransform: 'uppercase' }}>
          <Trans>waiting...</Trans>
        </ButtonProcess>
      )}
      {buyState === 'deposit' && (
        <ButtonSuccess
          fontSize={'0.875rem'}
          onClick={toggleDepositToNahmiiModal}
          style={{ textTransform: 'uppercase' }}
        >
          <Trans>Deposit</Trans>
        </ButtonSuccess>
      )}
    </>
  )
}
