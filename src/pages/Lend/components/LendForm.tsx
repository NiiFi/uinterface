import React, { useState, useCallback } from 'react'
import { FixedNumber, formatFixed, parseFixed } from '@ethersproject/bignumber'
import { Trans } from '@lingui/macro'
import { ButtonPrimary } from 'components/Button'
import { GetTokenLogoURL } from 'components/CurrencyLogo'
import Slider from 'components/Slider'
import { RowBetween } from 'components/Row'
import { WalletConnect } from 'components/Wallet'
import { useActiveWeb3React } from 'hooks/web3'
import { FlexColumn, FlexRowWrapper, TYPE, Dots } from 'theme'
import { InputWrapper, Input, OverlapButton } from './styled'
import { useLendingPoolContract } from 'hooks/useContract'
import useDebouncedChangeHandler from 'hooks/useDebouncedChangeHandler'
import { useAddPopup } from 'state/application/hooks'
import { escapeRegExp, shortenDecimalValues } from 'utils'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { inputRegex } from 'components/NumericalInput'
import { FormType, typeLabels, availableLabels, headerLabels, subheaderLabels } from 'constants/lend'

export default function LendForm({
  type,
  symbol,
  address,
  totalAvailable,
  currencyPrice,
  decimals,
}: {
  type: FormType
  symbol: string
  address: string
  totalAvailable: string
  currencyPrice: string
  decimals: number
}) {
  const { account } = useActiveWeb3React()
  const [loading, setLoading] = useState(false)
  const lendingPoolContract = useLendingPoolContract()
  const [currentValue, setCurrentValue] = useState('')
  const [newhealthFactor, setNewhealthFactor] = useState('')
  const [sliderValue, setSliderValue] = useState(0)
  const addPopup = useAddPopup()

  const SliderChangeHandler: any = (e: any) => {
    const calcValue = (parseFloat(totalAvailable) * e - 0.01) / 100
    handleValueChange(calcValue > 0 ? calcValue.toString() : '0.000001')
    setSliderValue(e)
  }
  const [innerSliderValue, setDebouncedSliderValue] = useDebouncedChangeHandler(sliderValue, SliderChangeHandler)
  const calculateNewHealthFactor = useCallback(
    async (inputValue: string) => {
      if (!inputValue || !lendingPoolContract) {
        setNewhealthFactor('')
        return
      }

      const pool = await lendingPoolContract.getUserAccountData(account)
      const currentLiquidationThreshold = formatFixed(pool.currentLiquidationThreshold, 4)
      const totalCollateralETH = formatFixed(pool.totalCollateralETH, 18)
      const totalDebtETH = formatFixed(pool.totalDebtETH, 18)

      const currentValueETH = FixedNumber.from(inputValue).mulUnsafe(FixedNumber.from(currencyPrice)).toString()

      let healthFactor

      switch (type) {
        case FormType.BORROW:
          healthFactor = FixedNumber.from(totalCollateralETH)
            .mulUnsafe(FixedNumber.from(currentLiquidationThreshold))
            .divUnsafe(FixedNumber.from(totalDebtETH).addUnsafe(FixedNumber.from(currentValueETH)))
            .toString()

          break
        default:
          healthFactor = FixedNumber.from(totalCollateralETH)
            .addUnsafe(FixedNumber.from(currentValueETH))
            .mulUnsafe(FixedNumber.from(currentLiquidationThreshold))
            .divUnsafe(FixedNumber.from(totalDebtETH))
            .toString()
      }

      setNewhealthFactor(healthFactor)
      setSliderValue((parseFloat(inputValue) * 100) / parseFloat(totalAvailable))
    },
    [lendingPoolContract, currencyPrice, account, totalAvailable, type]
  )

  const handleValueChange = useCallback(
    (value: string) => {
      const prevValue = value.replace(/,/g, '.')
      let exceedMaxValue = false

      try {
        exceedMaxValue = FixedNumber.from(totalAvailable)
          .subUnsafe(FixedNumber.from(prevValue || '0'))
          .isNegative()
      } catch {
        return
      }

      if (exceedMaxValue || !inputRegex.test(escapeRegExp(prevValue))) {
        return
      }

      setCurrentValue(prevValue)
      calculateNewHealthFactor(prevValue)
    },
    [totalAvailable, calculateNewHealthFactor]
  )

  const handleSubmit = useCallback(async () => {
    if (!lendingPoolContract || !account) return

    setLoading(true)

    try {
      const weiValue = parseFixed(currentValue, decimals).toString()
      const gasPrice = await lendingPoolContract.provider.getGasPrice()
      const estimatedGas = await lendingPoolContract.estimateGas.deposit(address, weiValue, account, 0)

      const tx = await lendingPoolContract.deposit(address, weiValue, account, 0, {
        gasPrice,
        gasLimit: calculateGasMargin(estimatedGas),
      })

      addPopup({ txn: { hash: tx.hash, success: true } }, tx.hash)
    } catch (e: any) {
      addPopup({ txn: { hash: '', success: false, summary: e.message } })
    }

    setCurrentValue('')
    calculateNewHealthFactor('')
    setSliderValue(0)
    setLoading(false)
  }, [currentValue, lendingPoolContract, calculateNewHealthFactor, addPopup, account, address, decimals])

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
                    {shortenDecimalValues(totalAvailable)} {symbol}
                  </TYPE.subHeader>
                </RowBetween>
                <Input
                  value={currentValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e.target.value)}
                  imageUrl={GetTokenLogoURL(address)}
                />
                <OverlapButton
                  onClick={() => {
                    setCurrentValue(totalAvailable)
                    calculateNewHealthFactor(totalAvailable)
                  }}
                >
                  <Trans>Max</Trans>
                </OverlapButton>
              </InputWrapper>
              <InputWrapper>
                <RowBetween style={{ marginBottom: '10px' }}>
                  <TYPE.subHeader color="green2">{type === FormType.BORROW && <Trans>Safer</Trans>}</TYPE.subHeader>
                  <TYPE.subHeader color="text6">
                    <Trans>New health factor</Trans>{' '}
                    <strong>{newhealthFactor ? shortenDecimalValues(newhealthFactor) : '-'}</strong>
                  </TYPE.subHeader>
                  <TYPE.subHeader color="red3">{type === FormType.BORROW && <Trans>Riskier</Trans>}</TYPE.subHeader>
                </RowBetween>

                <InputWrapper
                  style={{
                    backgroundImage:
                      type === FormType.BORROW ? 'linear-gradient(to right, #1BC300, #FFB800, #FF0000)' : 'none',
                    borderRadius: '20px',
                  }}
                >
                  <Slider size={20} value={innerSliderValue} onChange={setDebouncedSliderValue} />
                </InputWrapper>
              </InputWrapper>
              <ButtonPrimary onClick={handleSubmit} disabled={loading || !currentValue}>
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
