import React, { useState, useCallback, useEffect } from 'react'
import { FixedNumber, formatFixed, parseFixed } from '@ethersproject/bignumber'
import { Trans } from '@lingui/macro'
import { ButtonPrimary } from 'components/Button'
import { GetTokenLogoURL } from 'components/CurrencyLogo'
import { RowBetween } from 'components/Row'
import { WalletConnect } from 'components/Wallet'
import { useActiveWeb3React } from 'hooks/web3'
import { FlexColumn, FlexRowWrapper, TYPE, Dots } from 'theme'
import { InputWrapper, Input, OverlapButton } from './styled'
import { useLendingPoolContract, useTokenContract } from 'hooks/useContract'
import { useAddPopup } from 'state/application/hooks'
import { escapeRegExp, shortenDecimalValues } from 'utils'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { inputRegex } from 'components/NumericalInput'
import { FormType, typeLabels, availableLabels, headerLabels, subheaderLabels } from 'constants/lend'
import { LENDING_POOL_CONTRACT_ADDRESS } from '../../../constants/general'

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
  const [tokenAllowance, setTokenAllowance] = useState('0')
  const [hasToBeApproved, setHasToBeApproved] = useState(false)
  const addPopup = useAddPopup()
  const tokenContract = useTokenContract(address)
  const maxApprovalValue = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

  useEffect(() => {
    if (!tokenContract || !account) return
    tokenContract.allowance(account, LENDING_POOL_CONTRACT_ADDRESS).then((allowance) => {
      setTokenAllowance(formatFixed(allowance.toString(), decimals))
    })
  }, [tokenContract, account, decimals])

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

      setNewhealthFactor(
        FixedNumber.from(totalCollateralETH)
          .addUnsafe(FixedNumber.from(currentValueETH))
          .mulUnsafe(FixedNumber.from(currentLiquidationThreshold))
          .divUnsafe(FixedNumber.from(totalDebtETH))
          .toString()
      )
    },
    [lendingPoolContract, currencyPrice, account]
  )

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const prevValue = e.target.value.replace(/,/g, '.')
      if (
        !inputRegex.test(escapeRegExp(prevValue)) ||
        FixedNumber.from(totalAvailable)
          .subUnsafe(FixedNumber.from(prevValue || '0'))
          .isNegative()
      ) {
        return
      }
      setCurrentValue(prevValue)
      calculateNewHealthFactor(prevValue)
    },
    [totalAvailable, calculateNewHealthFactor]
  )

  useEffect(() => {
    if (type === FormType.BORROW || FormType.WITHDRAW) {
      setHasToBeApproved(false)
    }
    setHasToBeApproved(
      FixedNumber.from(tokenAllowance)
        .subUnsafe(FixedNumber.from(currentValue || '0'))
        .isNegative()
    )
  }, [currentValue, tokenAllowance, type])

  const handleSubmit = useCallback(async () => {
    if (!lendingPoolContract || !account || !tokenContract) return

    setLoading(true)
    const gasPrice = await lendingPoolContract.provider.getGasPrice()

    let approvalTx = null
    if (hasToBeApproved) {
      try {
        const estimatedGas = await tokenContract.estimateGas.approve(LENDING_POOL_CONTRACT_ADDRESS, maxApprovalValue)
        approvalTx = await tokenContract.approve(LENDING_POOL_CONTRACT_ADDRESS, maxApprovalValue, {
          gasPrice,
          gasLimit: calculateGasMargin(estimatedGas),
        })
        await approvalTx.wait()
        const allowance = await tokenContract.allowance(account, LENDING_POOL_CONTRACT_ADDRESS)
        setTokenAllowance(formatFixed(allowance.toString(), decimals))
        addPopup({ txn: { hash: approvalTx.hash, success: true } }, approvalTx.hash)
      } catch (e) {
        if (approvalTx) {
          addPopup({ txn: { hash: approvalTx.hash, success: false } }, approvalTx.hash)
        } else {
          addPopup({ txn: { hash: '', success: false, summary: e.message } })
        }
      }
      setLoading(false)
      return
    }

    let tx = null
    try {
      const weiValue = parseFixed(currentValue, decimals).toString()
      const estimatedGas = await lendingPoolContract.estimateGas.deposit(address, weiValue, account, 0)

      tx = await lendingPoolContract.deposit(address, weiValue, account, 0, {
        gasPrice,
        gasLimit: calculateGasMargin(estimatedGas),
      })
      await tx.wait()

      addPopup({ txn: { hash: tx.hash, success: true } }, tx.hash)
    } catch (e) {
      if (tx) {
        addPopup({ txn: { hash: tx.hash, success: false } }, tx.hash)
      } else {
        addPopup({ txn: { hash: '', success: false, summary: e.message } })
      }
    }

    setCurrentValue('')
    calculateNewHealthFactor('')
    setLoading(false)
  }, [
    currentValue,
    tokenContract,
    lendingPoolContract,
    calculateNewHealthFactor,
    addPopup,
    account,
    address,
    decimals,
    hasToBeApproved,
  ])

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
                <Input value={currentValue} onChange={handleValueChange} imageUrl={GetTokenLogoURL(address)} />
                <OverlapButton
                  onClick={() => {
                    setCurrentValue(totalAvailable)
                    calculateNewHealthFactor(totalAvailable)
                  }}
                >
                  <Trans>Max</Trans>
                </OverlapButton>
                {newhealthFactor && (
                  <RowBetween style={{ marginTop: '10px' }}>
                    <TYPE.subHeader color="text6">
                      <Trans>New health factor</Trans>
                    </TYPE.subHeader>
                    <TYPE.subHeader color="text6">{shortenDecimalValues(newhealthFactor)}</TYPE.subHeader>
                  </RowBetween>
                )}
              </InputWrapper>
              <ButtonPrimary
                onClick={handleSubmit}
                disabled={loading || !currentValue || FixedNumber.from(currentValue).isZero()}
              >
                {loading ? (
                  <>
                    <Trans>Processing</Trans>
                    <Dots />
                  </>
                ) : hasToBeApproved ? (
                  <Trans>Approve</Trans>
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
