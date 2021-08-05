import { Trans, t } from '@lingui/macro'

import { Currency, CurrencyAmount, Token, TradeType } from '@uniswap/sdk-core'
import SwapTable from '../../components/Table/swap'
import OverviewTable from '../../components/Table/overview'
import { Trade } from '@uniswap/v2-sdk'
import { AdvancedSwapDetails } from 'components/swap/AdvancedSwapDetails'
import UnsupportedCurrencyFooter from 'components/swap/UnsupportedCurrencyFooter'
import { MouseoverTooltip, MouseoverTooltipContent } from 'components/Tooltip'
import JSBI from 'jsbi'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, CheckCircle, HelpCircle, Info } from 'react-feather'
import ReactGA from 'react-ga'
import { RouteComponentProps, useLocation } from 'react-router-dom'
import { Text } from 'rebass'
import styled from 'styled-components'
import AddressInputPanel from '../../components/AddressInputPanel'
import { ButtonConfirmed, ButtonError, ButtonPrimary } from '../../components/Button'
import { DefaultCard, GreyCard } from '../../components/Card'
import Tab from '../../components/tab/Tab'
import Tabs from '../../components/tab/Tabs'
import TabPanel from '../../components/tab/TabPanel'
import { AutoColumn, FlexColumn } from '../../components/Column'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import CurrencyLogo from '../../components/CurrencyLogo'
import Loader from '../../components/Loader'
import Row, { AutoRow, RowFixed, ResponsiveRow } from '../../components/Row'
import confirmPriceImpactWithoutFee from '../../components/swap/confirmPriceImpactWithoutFee'
import ConfirmSwapModal from '../../components/swap/ConfirmSwapModal'
import ToggleDrawer from '../../components/Header/ToggleDrawer'
import Slippage from '../../components/swap/Slippage'
import CurrencyDropdown from '../../components/Dropdowns/CurrencyDropdown'
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from 'components/swap/styleds'
import TradePrice from '../../components/swap/TradePrice'
import { SwitchLocaleLink } from '../../components/SwitchLocaleLink'
import TokenWarningModal from '../../components/TokenWarningModal'
import { useAllTokens, useCurrency } from '../../hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
import useENSAddress from '../../hooks/useENSAddress'
import { useERC20PermitFromTrade, UseERC20PermitState } from '../../hooks/useERC20Permit'
import useIsArgentWallet from '../../hooks/useIsArgentWallet'
import { useIsSwapUnsupported } from '../../hooks/useIsSwapUnsupported'
import { useSwapCallback } from '../../hooks/useSwapCallback'
import { useUSDCValue } from '../../hooks/useUSDCPrice'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { useActiveWeb3React } from '../../hooks/web3'
import useTheme from '../../hooks/useTheme'
import { useWalletModalToggle } from '../../state/application/hooks'
import { Field } from '../../state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks'
import { useExpertModeManager, useUserSingleHopOnly } from '../../state/user/hooks'
import { BodyScroller, LinkStyledButton, TYPE, Disclaimer, BaseCurrencyView, CurrencySelectWrapper } from '../../theme'
import { computeFiatValuePriceImpact } from '../../utils/computeFiatValuePriceImpact'
import { getTradeVersion } from '../../utils/getTradeVersion'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { warningSeverity } from '../../utils/prices'
import AppBody from '../AppBody'
import SwapChart from 'components/LineChart/swap'
import OverviewChart from 'components/LineChart/overview'
import BarChart from 'components/BarChart/overview'
import AppBar from 'components/AppBar'
import Percent from 'components/Percent'

const StyledAppBar = styled(AppBar)`
  padding: 0px 2rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 0px 0.625rem;
  `}
`

const StyledInfo = styled(Info)`
  opacity: 0.4;
  color: ${({ theme }) => theme.text1};
  height: 16px;
  width: 16px;
  :hover {
    opacity: 0.8;
  }
`
const ArrowContainer = styled.div`
  width: 100%;
  height: 1px;
  margin: 1rem 0px;
  position: relative;
  background-color: ${({ theme }) => theme.bg5};
`
export default function Swap({ history }: RouteComponentProps) {
  const [activeTab, setActiveTab] = useState<number>(0)
  const loadedUrlParams = useDefaultsFromURLSearch()
  const { state } = useLocation<any>()

  // TODO: implement more flexible solution
  useEffect(() => {
    if (!state?.activeTab) {
      return
    }

    setActiveTab(state.activeTab)

    const scrollTo = setTimeout(() =>
      document.querySelector('#top-tokens-table')?.scrollIntoView({ behavior: 'smooth' })
    )
    return () => {
      clearTimeout(scrollTo)
    }
  }, [state])

  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId),
  ]
  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c?.isToken ?? false) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  )
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !Boolean(token.address in defaultTokens)
    })

  const { account } = useActiveWeb3React()
  const theme = useTheme()

  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const {
    toggledTrade: trade,
    allowedSlippage,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
  } = useDerivedSwapInfo()

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const { address: recipientAddress } = useENSAddress(recipient)

  const parsedAmounts = useMemo(
    () =>
      showWrap
        ? {
            [Field.INPUT]: parsedAmount,
            [Field.OUTPUT]: parsedAmount,
          }
        : {
            [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
            [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
          },
    [independentField, parsedAmount, showWrap, trade]
  )

  const fiatValueInput = useUSDCValue(parsedAmounts[Field.INPUT])
  const fiatValueOutput = useUSDCValue(parsedAmounts[Field.OUTPUT])
  const priceImpact = computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput)

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput]
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput]
  )

  // reset if they close warning without tokens in params
  const handleDismissTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
    history.push('/swap/')
  }, [history])

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: Trade<Currency, Currency, TradeType> | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )
  const routeNotFound = !trade?.route

  // check whether the user has approved the router on the input token
  const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)
  const { state: signatureState, gatherPermitSignature } = useERC20PermitFromTrade(trade, allowedSlippage)

  const handleApprove = useCallback(async () => {
    if (signatureState === UseERC20PermitState.NOT_SIGNED && gatherPermitSignature) {
      try {
        await gatherPermitSignature()
      } catch (error) {
        // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
        if (error?.code !== 4001) {
          await approveCallback()
        }
      }
    } else {
      await approveCallback()
    }
  }, [approveCallback, gatherPermitSignature, signatureState])

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted])

  const maxInputAmount: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  // const showMaxButton = Boolean(maxInputAmount?.greaterThan(0) && !parsedAmounts[Field.INPUT]?.equalTo(maxInputAmount))

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(() => {
    if (!swapCallback) {
      return
    }
    if (priceImpact && !confirmPriceImpactWithoutFee(priceImpact)) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then((hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: hash })

        ReactGA.event({
          category: 'Swap',
          action:
            recipient === null
              ? 'Swap w/o Send'
              : (recipientAddress ?? recipient) === account
              ? 'Swap w/o Send + recipient'
              : 'Swap w/ Send',
          label: [
            trade?.inputAmount?.currency?.symbol,
            trade?.outputAmount?.currency?.symbol,
            getTradeVersion(trade),
            singleHopOnly ? 'SH' : 'MH',
          ].join('/'),
        })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [
    priceImpact,
    swapCallback,
    tradeToConfirm,
    showConfirm,
    recipient,
    recipientAddress,
    account,
    trade,
    singleHopOnly,
  ])

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on the greater of fiat value price impact and execution price impact
  const priceImpactSeverity = useMemo(() => {
    const executionPriceImpact = trade?.priceImpact
    return warningSeverity(
      executionPriceImpact && priceImpact
        ? executionPriceImpact.greaterThan(priceImpact)
          ? executionPriceImpact
          : priceImpact
        : executionPriceImpact ?? priceImpact
    )
  }, [priceImpact, trade])

  const isArgentWallet = useIsArgentWallet()

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !isArgentWallet &&
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ showConfirm: false, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn, showConfirm })
  }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection]
  )

  const handleMaxInput = useCallback(() => {
    maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact())
  }, [maxInputAmount, onUserInput])

  const handleOutputSelect = useCallback(
    (outputCurrency) => onCurrencySelection(Field.OUTPUT, outputCurrency),
    [onCurrencySelection]
  )

  const swapIsUnsupported = useIsSwapUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const priceImpactTooHigh = priceImpactSeverity > 3 && !isExpertMode
  const TabChangeHandler: any = (e: any, newValue: any) => setActiveTab(newValue)
  return (
    <>
      <TokenWarningModal
        isOpen={importTokensNotInDefault.length > 0 && !dismissTokenWarning}
        tokens={importTokensNotInDefault}
        onConfirm={handleConfirmTokenWarning}
        onDismiss={handleDismissTokenWarning}
      />
      <StyledAppBar>
        <ToggleDrawer />
        <Tabs value={activeTab} onChange={TabChangeHandler}>
          <Tab key={`tab-0`} label={t`Swap`} />
          <Tab key={`tab-1`} label={t`Overview`} />
        </Tabs>
        <CurrencySelectWrapper>
          <CurrencyDropdown />
        </CurrencySelectWrapper>
      </StyledAppBar>
      <BodyScroller>
        <TabPanel key={'tab-panel-0'} activeIndex={activeTab} index={0}>
          <AutoColumn gap="lg">
            <ResponsiveRow gap="2rem">
              <AppBody size="md" style={{ minHeight: '440px' }}>
                <Wrapper id="swap-page">
                  <ConfirmSwapModal
                    isOpen={showConfirm}
                    trade={trade}
                    originalTrade={tradeToConfirm}
                    onAcceptChanges={handleAcceptChanges}
                    attemptingTxn={attemptingTxn}
                    txHash={txHash}
                    recipient={recipient}
                    allowedSlippage={allowedSlippage}
                    onConfirm={handleSwap}
                    swapErrorMessage={swapErrorMessage}
                    onDismiss={handleConfirmDismiss}
                  />

                  <AutoColumn gap={'md'}>
                    <div style={{ display: 'relative' }}>
                      <CurrencyInputPanel
                        label={
                          independentField === Field.OUTPUT && !showWrap ? (
                            <Trans>From (at most)</Trans>
                          ) : (
                            <Trans>From</Trans>
                          )
                        }
                        value={formattedAmounts[Field.INPUT]}
                        showMaxButton={false}
                        labelText="From"
                        currency={currencies[Field.INPUT]}
                        onUserInput={handleTypeInput}
                        onMax={handleMaxInput}
                        fiatValue={fiatValueInput ?? undefined}
                        onCurrencySelect={handleInputSelect}
                        otherCurrency={currencies[Field.OUTPUT]}
                        showCommonBases={true}
                        id="swap-currency-input"
                      />
                      <ArrowContainer
                        onClick={() => {
                          setApprovalSubmitted(false) // reset 2 step UI for approvals
                          onSwitchTokens()
                        }}
                      >
                        <ArrowWrapper clickable>
                          <ChevronUp size="1.25rem" color={'#FFFFFF'} />
                          <ChevronDown size="1.25rem" color={'#FFFFFF'} />
                        </ArrowWrapper>
                      </ArrowContainer>
                      <CurrencyInputPanel
                        value={formattedAmounts[Field.OUTPUT]}
                        onUserInput={handleTypeOutput}
                        labelText="To"
                        label={
                          independentField === Field.INPUT && !showWrap ? (
                            <Trans>To (at least)</Trans>
                          ) : (
                            <Trans>To</Trans>
                          )
                        }
                        showMaxButton={false}
                        hideBalance={false}
                        fiatValue={fiatValueOutput ?? undefined}
                        priceImpact={priceImpact}
                        currency={currencies[Field.OUTPUT]}
                        onCurrencySelect={handleOutputSelect}
                        otherCurrency={currencies[Field.INPUT]}
                        showCommonBases={true}
                        id="swap-currency-output"
                      />
                    </div>
                    <Slippage />
                    {recipient !== null && !showWrap ? (
                      <>
                        <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                          <ArrowWrapper clickable={false}>
                            <ChevronDown size="16" color={theme.text2} />
                          </ArrowWrapper>
                          <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                            <Trans>- Remove send</Trans>
                          </LinkStyledButton>
                        </AutoRow>
                        <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
                      </>
                    ) : null}
                    {showWrap ? null : (
                      <Row style={{ justifyContent: !trade ? 'center' : 'space-between' }}>
                        {trade ? (
                          <RowFixed>
                            <TradePrice
                              price={trade.executionPrice}
                              showInverted={showInverted}
                              setShowInverted={setShowInverted}
                            />
                            <MouseoverTooltipContent
                              content={<AdvancedSwapDetails trade={trade} allowedSlippage={allowedSlippage} />}
                            >
                              <StyledInfo />
                            </MouseoverTooltipContent>
                          </RowFixed>
                        ) : null}
                      </Row>
                    )}
                    <BottomGrouping>
                      {swapIsUnsupported ? (
                        <ButtonPrimary disabled={true}>
                          <TYPE.main mb="4px">
                            <Trans>Unsupported Asset</Trans>
                          </TYPE.main>
                        </ButtonPrimary>
                      ) : !account ? (
                        <ButtonPrimary onClick={toggleWalletModal}>
                          <Trans>Connect Wallet</Trans>
                        </ButtonPrimary>
                      ) : showWrap ? (
                        <ButtonPrimary disabled={Boolean(wrapInputError)} onClick={onWrap}>
                          {wrapInputError ??
                            (wrapType === WrapType.WRAP ? (
                              <Trans>Wrap</Trans>
                            ) : wrapType === WrapType.UNWRAP ? (
                              <Trans>Unwrap</Trans>
                            ) : null)}
                        </ButtonPrimary>
                      ) : routeNotFound && userHasSpecifiedInputOutput ? (
                        <GreyCard style={{ textAlign: 'center' }}>
                          <TYPE.main mb="4px">
                            {singleHopOnly ? (
                              <Trans>Insufficient liquidity for this trade. Try enabling multi-hop trades.</Trans>
                            ) : (
                              <Trans>Insufficient liquidity for this trade.</Trans>
                            )}
                          </TYPE.main>
                        </GreyCard>
                      ) : showApproveFlow ? (
                        <AutoRow style={{ flexWrap: 'nowrap', width: '100%' }}>
                          <AutoColumn style={{ width: '100%' }} gap="12px">
                            <ButtonConfirmed
                              onClick={handleApprove}
                              disabled={
                                approvalState !== ApprovalState.NOT_APPROVED ||
                                approvalSubmitted ||
                                signatureState === UseERC20PermitState.SIGNED
                              }
                              width="100%"
                              altDisabledStyle={approvalState === ApprovalState.PENDING} // show solid button while waiting
                              confirmed={
                                approvalState === ApprovalState.APPROVED ||
                                signatureState === UseERC20PermitState.SIGNED
                              }
                            >
                              <AutoRow justify="space-between" style={{ flexWrap: 'nowrap' }}>
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                  <CurrencyLogo
                                    currency={currencies[Field.INPUT]}
                                    size={'20px'}
                                    style={{ marginRight: '8px', flexShrink: 0 }}
                                  />
                                  {/* we need to shorten this string on mobile */}
                                  {approvalState === ApprovalState.APPROVED ||
                                  signatureState === UseERC20PermitState.SIGNED ? (
                                    <Trans>You can now trade {currencies[Field.INPUT]?.symbol}</Trans>
                                  ) : (
                                    <Trans>Allow the Niifi to use your {currencies[Field.INPUT]?.symbol}</Trans>
                                  )}
                                </span>
                                {approvalState === ApprovalState.PENDING ? (
                                  <Loader stroke="white" />
                                ) : (approvalSubmitted && approvalState === ApprovalState.APPROVED) ||
                                  signatureState === UseERC20PermitState.SIGNED ? (
                                  <CheckCircle size="20" color={theme.green1} />
                                ) : (
                                  <MouseoverTooltip
                                    text={
                                      <Trans>
                                        You must give the smart contracts permission to use your{' '}
                                        {currencies[Field.INPUT]?.symbol}. You only have to do this once per token.
                                      </Trans>
                                    }
                                  >
                                    <HelpCircle size="20" color={'white'} style={{ marginLeft: '8px' }} />
                                  </MouseoverTooltip>
                                )}
                              </AutoRow>
                            </ButtonConfirmed>
                            <ButtonError
                              onClick={() => {
                                if (isExpertMode) {
                                  handleSwap()
                                } else {
                                  setSwapState({
                                    tradeToConfirm: trade,
                                    attemptingTxn: false,
                                    swapErrorMessage: undefined,
                                    showConfirm: true,
                                    txHash: undefined,
                                  })
                                }
                              }}
                              width="100%"
                              id="swap-button"
                              disabled={
                                !isValid ||
                                (approvalState !== ApprovalState.APPROVED &&
                                  signatureState !== UseERC20PermitState.SIGNED) ||
                                priceImpactTooHigh
                              }
                              error={isValid && priceImpactSeverity > 2}
                            >
                              <Text fontSize={16} fontWeight={500}>
                                {priceImpactTooHigh ? (
                                  <Trans>High Price Impact</Trans>
                                ) : priceImpactSeverity > 2 ? (
                                  <Trans>Swap Anyway</Trans>
                                ) : (
                                  <Trans>Swap</Trans>
                                )}
                              </Text>
                            </ButtonError>
                          </AutoColumn>
                        </AutoRow>
                      ) : (
                        <ButtonError
                          onClick={() => {
                            if (isExpertMode) {
                              handleSwap()
                            } else {
                              setSwapState({
                                tradeToConfirm: trade,
                                attemptingTxn: false,
                                swapErrorMessage: undefined,
                                showConfirm: true,
                                txHash: undefined,
                              })
                            }
                          }}
                          id="swap-button"
                          disabled={!isValid || priceImpactTooHigh || !!swapCallbackError}
                          error={isValid && priceImpactSeverity > 2 && !swapCallbackError}
                        >
                          <Text fontSize={20} fontWeight={500}>
                            {swapInputError ? (
                              swapInputError
                            ) : priceImpactTooHigh ? (
                              <Trans>Price Impact Too High</Trans>
                            ) : priceImpactSeverity > 2 ? (
                              <Trans>Swap Anyway</Trans>
                            ) : (
                              <Trans>Swap</Trans>
                            )}
                          </Text>
                        </ButtonError>
                      )}
                      {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
                    </BottomGrouping>
                  </AutoColumn>
                </Wrapper>
              </AppBody>
              <AppBody size="md" style={{ minHeight: '440px' }}>
                <Wrapper>
                  <SwapChart />
                </Wrapper>
              </AppBody>
            </ResponsiveRow>
            <ResponsiveRow>
              <AppBody size="lg">
                <SwapTable />
              </AppBody>
            </ResponsiveRow>
          </AutoColumn>
          <SwitchLocaleLink />
          {!swapIsUnsupported ? null : (
            <UnsupportedCurrencyFooter show={swapIsUnsupported} currencies={[currencies.INPUT, currencies.OUTPUT]} />
          )}
        </TabPanel>
        <TabPanel key={'tab-panel-1'} activeIndex={activeTab} index={1}>
          <AutoColumn gap="lg">
            <Wrapper style={{ padding: 0 }}>
              <Disclaimer>
                <span>Disclaimer:</span>
                {` `}
                {t`This is Dummy Data`}
              </Disclaimer>
            </Wrapper>
            <ResponsiveRow gap="2rem">
              <AppBody size="md">
                <Wrapper>
                  <OverviewChart />
                </Wrapper>
              </AppBody>
              <AppBody size="md">
                <Wrapper>
                  <BarChart />
                </Wrapper>
              </AppBody>
            </ResponsiveRow>
            <ResponsiveRow gap="2rem">
              <DefaultCard width="100%" style={{ minHeight: '100px', paddingTop: '25px' }}>
                <TYPE.subHeader fontSize="16px">
                  <Trans>Volume 24H</Trans>
                </TYPE.subHeader>
                <FlexColumn style={{ padding: '5px 0' }}>
                  <TYPE.mediumHeader color="text1">
                    <BaseCurrencyView type="symbol" value={1240000000} numeralFormat={'0.[00]a'} />
                  </TYPE.mediumHeader>
                  <Percent value={7.258268337244848} fontWeight={400} />
                </FlexColumn>
              </DefaultCard>
              <DefaultCard width="100%" style={{ minHeight: '100px', paddingTop: '25px' }}>
                <TYPE.subHeader fontSize="16px">
                  <Trans>Fees 24H</Trans>
                </TYPE.subHeader>
                <FlexColumn style={{ padding: '5px 0' }}>
                  <TYPE.mediumHeader color="text1">
                    <BaseCurrencyView type="symbol" value={3030000} numeralFormat={'0.[00]a'} />
                  </TYPE.mediumHeader>
                  <Percent value={7.858268337244848} fontWeight={400} />
                </FlexColumn>
              </DefaultCard>
              <DefaultCard width="100%" style={{ minHeight: '100px', paddingTop: '25px' }}>
                <TYPE.subHeader fontSize="16px">
                  <Trans>TVL</Trans>
                </TYPE.subHeader>
                <FlexColumn style={{ padding: '5px 0' }}>
                  <TYPE.mediumHeader color="text1">
                    <BaseCurrencyView type="symbol" value={1750000000} numeralFormat={'0.[00]a'} />
                  </TYPE.mediumHeader>
                  <Percent value={-0.508268337244848} fontWeight={400} />
                </FlexColumn>
              </DefaultCard>
            </ResponsiveRow>
            <ResponsiveRow id="top-tokens-table">
              <AppBody size="lg">
                <OverviewTable />
              </AppBody>
            </ResponsiveRow>
          </AutoColumn>
        </TabPanel>
      </BodyScroller>
    </>
  )
}
