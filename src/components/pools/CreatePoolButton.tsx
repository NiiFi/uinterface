import React, { useCallback } from 'react'
import { Trans } from '@lingui/macro'
import { Plus } from 'react-feather'

import { useCreatePoolModalToggle } from 'state/application/hooks'
import { ButtonPrimary, ButtonProps } from 'components/Button'
import CreatePoolModal from 'components/CreatePoolModal'

type CreatePoolButtonProps = ButtonProps
export default function CreatePoolButton({ onClick, ...rest }: CreatePoolButtonProps) {
  const toggleCreatePoolModal = useCreatePoolModalToggle()
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      toggleCreatePoolModal()
      onClick && onClick(e)
    },
    [onClick, toggleCreatePoolModal]
  )

  return (
    <>
      <ButtonPrimary
        {...rest}
        style={{ height: '2.25rem', fontSize: '0.875rem', textTransform: 'uppercase' }}
        onClick={handleClick}
      >
        <Plus style={{ marginRight: '0.5rem' }} />
        <Trans>Create Pool</Trans>
      </ButtonPrimary>
      <CreatePoolModal />
    </>
  )
}
