import React, { useEffect, useState, useCallback } from 'react'
import { Trans, t } from '@lingui/macro'
import { ButtonPrimary } from 'components/Button'
import { GetTokenLogoURL } from 'components/CurrencyLogo'
import { RowBetween } from 'components/Row'
import { WalletConnect } from 'components/Wallet'
import { useActiveWeb3React } from 'hooks/web3'
import { FlexColumn, FlexRowWrapper, TYPE, Dots } from 'theme'
import { InputWrapper, Input, OverlapButton } from './styled'

// TODO: move enum and labels to src/constants/lend.ts after merging OM-548
export enum FormType {
  DEPOSIT = 1,
  BORROW = 2,
  WITHDRAW = 3,
  REPAY = 4,
}

const typeLabels: { [type: string]: string } = {
  [FormType.DEPOSIT]: t`Deposit`,
  [FormType.BORROW]: t`Borrow`,
  [FormType.WITHDRAW]: t`Withdraw`,
  [FormType.REPAY]: t`Repay`,
}

const availableLabels: { [type: string]: string } = {
  [FormType.DEPOSIT]: t`Available to deposit`,
  [FormType.BORROW]: t`Available to borrow`,
  [FormType.WITHDRAW]: t`Available to withdraw`,
  [FormType.REPAY]: t`Available to repay`,
}

const headerLabels: { [type: string]: string } = {
  [FormType.DEPOSIT]: t`How much would you like to deposit?`,
  [FormType.BORROW]: t`How much would you like to borrow?`,
  [FormType.WITHDRAW]: t`How much would you like to withdraw?`,
  [FormType.REPAY]: t`Repay`,
}

const subheaderLabels: { [type: string]: string } = {
  [FormType.DEPOSIT]: t`Please enter an amount you would like to deposit. The maximum amount you can deposit is shown below.`,
  [FormType.BORROW]: t`Please enter an amount you would like to borrow. The maximum amount you can borrow is shown below.`,
  [FormType.WITHDRAW]: t`Please enter an amount you would like to withdraw. The maximum amount you can withdraw is shown below.`,
  [FormType.REPAY]: t`How much do you want to repay?`,
}

export default function LendForm({ type, symbol, address }: { type: FormType; symbol: string; address: string }) {
  const { account } = useActiveWeb3React()
  const [loading, setLoading] = useState(false)
  const [currentValue, setCurrentValue] = useState('')
  const [maxValue, setMaxValue] = useState('0')

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation()
      console.log(`TOKEN ${address} {e.target.value}`)
      setCurrentValue(e.target.value)
    },
    [address]
  )

  const handleSubmit = useCallback(() => {
    setLoading(true)
    console.log(`Submit ${currentValue}`)
  }, [currentValue])

  useEffect(() => {
    setMaxValue('1.75')
  }, [])

  return (
    <>
      {account ? (
        <>
          <TYPE.body style={{ marginBottom: '16px' }}>
            {typeLabels[type]} {symbol}
          </TYPE.body>
          <FlexRowWrapper style={{ justifyContent: 'center' }}>
            <FlexColumn width="56%" style={{ textAlign: 'center' }}>
              <TYPE.body fontWeight={600}>{headerLabels[type]}</TYPE.body>
              <TYPE.body>{subheaderLabels[type]}</TYPE.body>
              <InputWrapper>
                <RowBetween style={{ marginBottom: '10px' }}>
                  <TYPE.subHeader color="text6">{availableLabels[type]}</TYPE.subHeader>
                  <TYPE.subHeader color="text6">
                    {maxValue} {symbol}
                  </TYPE.subHeader>
                </RowBetween>
                <Input value={currentValue} onChange={handleValueChange} imageUrl={GetTokenLogoURL(address)} />
                <OverlapButton
                  onClick={() => {
                    setCurrentValue(maxValue)
                  }}
                >
                  <Trans>Max</Trans>
                </OverlapButton>
              </InputWrapper>
              <ButtonPrimary onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <Trans>Processing</Trans>
                    <Dots />
                  </>
                ) : (
                  <Trans>Continue</Trans>
                )}
              </ButtonPrimary>
            </FlexColumn>
          </FlexRowWrapper>
        </>
      ) : (
        <WalletConnect />
      )}
    </>
  )
}
