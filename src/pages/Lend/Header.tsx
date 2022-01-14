import React from 'react'
import { ArrowLeft } from 'react-feather'
import { useHistory } from 'react-router-dom'
import CurrencyAvatar from 'components/CurrencyAvatar'
import { useToken } from 'hooks/Tokens'
import { BarTitle } from 'theme'

export default function Header({ address }: { address: string }) {
  const history = useHistory()
  const token = useToken(address)
  return (
    <BarTitle>
      <ArrowLeft style={{ cursor: 'pointer' }} onClick={history.goBack} />
      <CurrencyAvatar symbol={token?.symbol || ''} address={address} iconProps={{ width: '32', height: '32' }} />
    </BarTitle>
  )
}
