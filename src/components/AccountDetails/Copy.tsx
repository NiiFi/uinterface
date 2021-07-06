import React from 'react'
import styled from 'styled-components/macro'
import useCopyClipboard from '../../hooks/useCopyClipboard'

import { LinkStyledButton } from '../../theme'
import { CheckCircle } from 'react-feather'
import { CopyIcon as Copy } from '../Icons'
import { Trans } from '@lingui/macro'

const CopyIcon = styled(LinkStyledButton)`
  flex-shrink: 0;
  display: flex;
  font-size: 1rem;
  text-decoration: none;
  padding: 0px;
  color: ${({ theme }) => theme.text1};
  :hover,
  :active,
  :focus {
    text-decoration: none;
  }
`

export default function CopyHelper(props: { toCopy: string; children?: React.ReactNode }) {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <CopyIcon onClick={() => setCopied(props.toCopy)}>
      {isCopied ? (
        <>
          <CheckCircle size={'20'} />
          <Trans>Copied</Trans>
        </>
      ) : (
        <Copy />
      )}
      {isCopied ? '' : props.children}
    </CopyIcon>
  )
}
