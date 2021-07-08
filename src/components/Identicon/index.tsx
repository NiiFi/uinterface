import React, { useEffect, useRef } from 'react'

import styled from 'styled-components/macro'

import { useActiveWeb3React } from '../../hooks/web3'
import Jazzicon from '@metamask/jazzicon'

const ImageSize = 32
const ImageIconContainerSize = (ImageSize / 16).toFixed(3)

const StyledIdenticonContainer = styled.div`
  height: ${ImageIconContainerSize}rem;
  width: ${ImageIconContainerSize}rem;
  border-radius: ${Number(ImageIconContainerSize) + 0.125}rem;
  background-color: ${({ theme }) => theme.bg4};
`

export default function Identicon({ address }: { address?: string }) {
  const ref = useRef<HTMLDivElement>()

  const { account } = useActiveWeb3React()
  const valueToUse = address || account
  useEffect(() => {
    if (valueToUse && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(ImageSize, parseInt(valueToUse.slice(2, 10), 16)))
    }
  }, [valueToUse])

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
  return <StyledIdenticonContainer ref={ref as any} />
}
