import React from 'react'
import { Trans } from '@lingui/macro'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import { NftIcon } from 'components/Icons'
import { ButtonOutlined } from 'components/Button'
import { TYPE, RowWrapper, ColumnWrapper, BaseCurrencyView, MEDIA_WIDTHS } from 'theme'
import useTheme from 'hooks/useTheme'
import CollectionImage1 from 'assets/images/nft-collection-1.png'
import CollectionImage2 from 'assets/images/nft-collection-2.png'
import CollectionImage3 from 'assets/images/nft-collection-3.png'
import CollectionImage4 from 'assets/images/nft-collection-4.png'
import CollectionImage5 from 'assets/images/nft-collection-5.png'
import useBreakpoint from 'hooks/useBreakpoint'
import { LogoWrapper } from './styleds'

const NftWrapper = styled.div`
  padding: 0;
  button {
    width: auto;
    height: 36px;
    font-size: 14px;
    text-transform: uppercase;
    padding: 0 16px;
  }
  img {
    width: 100%;
  }
`

export default function Nfts() {
  const theme = useTheme()
  const balance = 2465.56
  const isSmallScreen = useBreakpoint(MEDIA_WIDTHS.upToSmall)
  const dynamicPadding = isSmallScreen ? 10 : 32
  const gridStyle = { padding: `0 ${dynamicPadding}px`, margin: '15px 0' }
  const gridExtraStyle = isSmallScreen ? {} : { borderLeft: `1px solid ${theme.bg3}` }

  const onSell = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, i: number) => {
    alert(`To be implemented ${i}`)
  }

  return (
    <>
      <RowWrapper style={{ padding: `${dynamicPadding}px`, paddingBottom: `${dynamicPadding / 2}px` }}>
        <LogoWrapper style={{ backgroundColor: theme.orange1 }}>
          <NftIcon color="#fff" />
        </LogoWrapper>
        <ColumnWrapper style={{ padding: '0 0 0 15px' }}>
          <TYPE.body>
            <Trans>Balance</Trans>
          </TYPE.body>
          <TYPE.mediumHeader>
            <BaseCurrencyView type="symbol" value={balance} />
          </TYPE.mediumHeader>
        </ColumnWrapper>
      </RowWrapper>
      <Grid container direction="row" alignItems="flex-start" spacing={0} style={{ padding: '0px' }}>
        {[CollectionImage1, CollectionImage2, CollectionImage3, CollectionImage4, CollectionImage5].map(
          (src, index) => (
            <Grid
              item
              xs={isSmallScreen ? 12 : 4}
              key={index}
              style={{ ...gridStyle, ...(index % 3 ? gridExtraStyle : {}) }}
            >
              <NftWrapper key={index}>
                <img src={src} alt={`Nft Collection Image ${index + 1}`} />
                <TYPE.body style={{ padding: '14px 0' }}>Nahmii Assembly</TYPE.body>
                <RowWrapper style={{ justifyContent: 'space-between', paddingBottom: '16px' }}>
                  <ColumnWrapper>
                    <TYPE.subHeader color={'text2'}>
                      <Trans>Price</Trans>
                    </TYPE.subHeader>
                    <TYPE.body fontWeight={500}>
                      <BaseCurrencyView type="symbol" value={index + 1} />
                    </TYPE.body>
                  </ColumnWrapper>
                  <ButtonOutlined onClick={(e) => onSell(e, index)}>
                    <Trans>Sell</Trans>
                  </ButtonOutlined>
                </RowWrapper>
              </NftWrapper>
            </Grid>
          )
        )}
      </Grid>
    </>
  )
}
