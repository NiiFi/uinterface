import React, { useEffect, useRef } from 'react'

import styled from 'styled-components/macro'

import { useActiveWeb3React } from '../../hooks/web3'
import Jazzicon from '@metamask/jazzicon'

const ImageSize = 40
const ImageIconContainerSize = (ImageSize / 16).toFixed(3)

const StyledIdenticonContainer = styled.div`
  height: ${ImageIconContainerSize}rem;
  width: ${ImageIconContainerSize}rem;
  border-radius: ${Number(ImageIconContainerSize) + 0.125}rem;
  background-color: ${({ theme }) => theme.bg4};
`

export default function Identicon() {
  const ref = useRef<HTMLDivElement>()

  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(ImageSize, parseInt(account.slice(2, 10), 16)))
    }
  }, [account])

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
  return <StyledIdenticonContainer ref={ref as any} />
}
