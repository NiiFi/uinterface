import React, { useCallback } from 'react'
import { PoolInvestPair } from 'state/pool/actions'
import { useSetUnSetPoolInvestTokenPair } from 'state/pool/hooks'
import { ButtonPrimary, ButtonOutlined, ButtonProps } from 'components/Button'

type InvestButtonProps = ButtonProps & PoolInvestPair & { type: 'primary' | 'outlined' }
export default function InvestButton({ token0, token1, onClick, type, ...rest }: InvestButtonProps) {
  let Button = ButtonPrimary
  const { setPoolInvestTokenPair } = useSetUnSetPoolInvestTokenPair()
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setPoolInvestTokenPair({ token0, token1 })
      onClick && onClick(e)
    },
    [setPoolInvestTokenPair, onClick, token0, token1]
  )

  if (type !== 'primary') {
    Button = ButtonOutlined
  }
  return <Button {...rest} onClick={handleClick} />
}
