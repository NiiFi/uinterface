import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Currency } from '@niifi/godzilla2-sdk'
import { t, Trans } from '@lingui/macro'

import { useActiveWeb3React } from 'hooks/web3'
import { TYPE, BaseCurrencyView } from 'theme'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { ApplicationModal } from 'state/application/actions'
import { ReactComponent as Close } from 'assets/images/x.svg'
import { useCurrency } from 'hooks/Tokens'
import { useCreatePoolModalToggle, useModalOpen, useWalletModalToggle } from 'state/application/hooks'
import Slippage from 'components/swap/Slippage'
import Row from 'components/Row'
import { ButtonPrimary } from 'components/Button'
import Modal from '../Modal'
import { Field } from 'state/mint/actions'
import useAddLiquidity from 'hooks/useAddLiquidity'
import { useInvestmentCalculator } from 'state/pool/hooks'
import { useApiToken } from 'hooks/useApi'

const HeaderRow = styled.div`
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
`

const UpperSection = styled.div`
  position: relative;
  padding: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1.5rem;
  `}
`

const CloseIcon = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    right: 1.5rem;
    top: 1.5rem;
  `}
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

export default function CreatePoolModal() {
  /**
   * IMPORTANT:
   * We need to remove the usage of all fake values once we have the
   * Integration of API and Actual Business logic in place.
   */
  const { account } = useActiveWeb3React()
  const poolInvestModalOpen = useModalOpen(ApplicationModal.CREATE_POOL)
  const toggleCreatePoolModal = useCreatePoolModalToggle()
  const toggleWalletModal = useWalletModalToggle()
  const [investmentValue, setInvestmentValue] = useState(0)
  const [currencyTokenOne, setCurrencyTokenOne] = useState<Currency | null | undefined>(useCurrency('ETH'))
  const [currencyTokenTwo, setCurrencyTokenTwo] = useState<Currency | null | undefined>(null)
  const { calculateTotalInvestment } = useInvestmentCalculator()

  const { addLiquidity, currencies, formattedAmounts, onFieldAInput, onFieldBInput, error, approveA, approveB } =
    useAddLiquidity(currencyTokenOne, currencyTokenTwo)

  // TODO: move all token prices to redux after fetching tokens from BE
  const { data: token0Data, abortController: token0AbortController } = useApiToken(
    currencies[Field.CURRENCY_A]?.address || ''
  )
  const { data: token1Data, abortController: token1AbortController } = useApiToken(
    currencies[Field.CURRENCY_B]?.address || ''
  )

  useEffect(() => {
    setInvestmentValue(
      calculateTotalInvestment(
        formattedAmounts[Field.CURRENCY_A],
        formattedAmounts[Field.CURRENCY_B],
        token0Data?.priceUSD,
        token1Data?.priceUSD
      )
    )
  }, [formattedAmounts, token0Data, token1Data, calculateTotalInvestment])

  useEffect(() => {
    return () => {
      token0AbortController.abort()
      token1AbortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Modal isOpen={poolInvestModalOpen} onDismiss={toggleCreatePoolModal} minHeight={false} maxHeight={90}>
      <Wrapper>
        <UpperSection>
          <CloseIcon onClick={toggleCreatePoolModal}>
            <CloseColor />
          </CloseIcon>
          <HeaderRow>
            <Trans>Create New Pool</Trans>
          </HeaderRow>
          <div style={{ marginTop: '0.5rem', marginBottom: '-0.5rem' }}>
            <CurrencyInputPanel
              id="pool-input"
              labelText={t`Add Liquidity`}
              currency={currencies[Field.CURRENCY_A]}
              showMaxButton={false}
              onCurrencySelect={(newToken) => setCurrencyTokenOne(newToken)}
              value={formattedAmounts[Field.CURRENCY_A]}
              onUserInput={onFieldAInput}
              otherCurrency={currencies[Field.CURRENCY_B]}
            />
            <CurrencyInputPanel
              id="pool-output"
              showMaxButton={false}
              currency={currencies[Field.CURRENCY_B]}
              value={formattedAmounts[Field.CURRENCY_B]}
              hideBalance={true}
              onCurrencySelect={(newToken) => setCurrencyTokenTwo(newToken)}
              onUserInput={onFieldBInput}
              otherCurrency={currencies[Field.CURRENCY_A]}
            />
          </div>
          <TYPE.body color={`text2`} fontWeight={400} fontSize={14} textAlign={'right'}>
            {`??? `}
            <BaseCurrencyView type="id" value={Number(investmentValue)} />
          </TYPE.body>
          <Row marginTop="1rem">
            <Slippage placement="left" />
          </Row>
          {error &&
            currencies[Field.CURRENCY_A] &&
            currencies[Field.CURRENCY_B] &&
            formattedAmounts[Field.CURRENCY_A] &&
            formattedAmounts[Field.CURRENCY_B] && (
              <TYPE.error fontSize="0.875rem" fontWeight="normal" error={true} textAlign="left" paddingTop="1rem">
                {error}
              </TYPE.error>
            )}
          {error && error === 'A_NOT_APPROVED' && (
            <ButtonPrimary onClick={approveA.approveACallback}>
              <Trans>Approve {currencies[Field.CURRENCY_A].symbol}</Trans>
            </ButtonPrimary>
          )}
          {error && error === 'B_NOT_APPROVED' && (
            <ButtonPrimary onClick={approveB.approveBCallback}>
              <Trans>Approve {currencies[Field.CURRENCY_B].symbol}</Trans>
            </ButtonPrimary>
          )}
          <Row marginTop="1rem">
            {account ? (
              <ButtonPrimary style={{ textTransform: 'uppercase' }} onClick={addLiquidity} disabled={error}>
                <Trans>Create Pool</Trans>
              </ButtonPrimary>
            ) : (
              <ButtonPrimary onClick={toggleWalletModal}>
                <Trans>Connect Wallet</Trans>
              </ButtonPrimary>
            )}
          </Row>
        </UpperSection>
      </Wrapper>
    </Modal>
  )
}
