import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'
import React from 'react'
import { Text } from 'rebass'
import { Currency } from '@niifi/godzilla2-sdk'

import { COMMON_BASES } from '../../constants/routing'
import { currencyId } from '../../utils/currencyId'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { AutoRow } from '../Row'
import CurrencyLogo from '../CurrencyLogo'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.bg3)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.bg5};
  }

  background-color: ${({ theme, disable }) => disable && theme.bg5};
  opacity: ${({ disable }) => disable && '0.4'};
`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency,
  otherSelectedCurrency,
}: {
  chainId?: number
  selectedCurrency?: Currency | null
  otherSelectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const bases = typeof chainId !== 'undefined' ? COMMON_BASES[chainId] ?? [] : []

  return bases.length > 0 ? (
    <AutoColumn gap="md">
      <AutoRow>
        <Text fontWeight={500} fontSize={14}>
          <Trans>Common bases</Trans>
        </Text>
        <QuestionHelper text={<Trans>These tokens are commonly paired with other tokens.</Trans>} />
      </AutoRow>
      <AutoRow gap="4px">
        {bases.map((currency: Currency) => {
          const isSelected = selectedCurrency?.equals(currency) || otherSelectedCurrency?.equals(currency)
          return (
            <BaseWrapper
              onClick={() => !isSelected && onSelect(currency)}
              disable={isSelected}
              key={currencyId(currency)}
            >
              <CurrencyLogo currency={currency} />
              <Text fontWeight={500} fontSize={16} style={{ marginLeft: '8px' }}>
                {currency.symbol}
              </Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoColumn>
  ) : null
}
