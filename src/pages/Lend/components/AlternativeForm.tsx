import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'
import { Trans } from '@lingui/macro'
import { ButtonPrimary } from 'components/Button'
import { TYPE, FlexColumn } from 'theme'

function ZeroBalance({ symbol, history }: { symbol: string; history: any }) {
  return (
    <>
      <TYPE.body fontWeight={600}>
        <Trans>Your balance is zero</Trans>
      </TYPE.body>
      <TYPE.body>
        <Trans>
          Your balance of {symbol} is 0. Transfer {symbol} to your wallet to be able to deposit
        </Trans>
      </TYPE.body>
      <ButtonPrimary onClick={() => history.push(`/swap/${symbol.toUpperCase()}`)}>
        <Trans>Swap</Trans>
      </ButtonPrimary>
    </>
  )
}

function NoLiquidity({ symbol, address, history }: { symbol: string; address: string; history: any }) {
  return (
    <>
      <TYPE.body fontWeight={600}>
        <Trans>No liquidity</Trans>
      </TYPE.body>
      <TYPE.body>
        <Trans>There is no {symbol} available liquidity to borrow.</Trans>
      </TYPE.body>
      <ButtonPrimary onClick={() => history.push(`/lend/deposit/${address}`)}>
        <Trans>Deposit now</Trans>
      </ButtonPrimary>
    </>
  )
}

export default memo(function AlternativeForm({ id, data }: { id: number; data: { symbol: string; address: string } }) {
  const history = useHistory()

  if (!id) return <></>

  let Content: JSX.Element = <Trans>Something is wrong</Trans>

  switch (id) {
    case 1:
      Content = <ZeroBalance symbol={data.symbol} history={history} />
      break
    case 2:
      Content = <NoLiquidity symbol={data.symbol} history={history} address={data.address} />
      break
  }

  return (
    <FlexColumn
      width="56%"
      style={{
        textAlign: 'center',
      }}
    >
      {Content}
    </FlexColumn>
  )
})
