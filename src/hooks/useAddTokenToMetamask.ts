import { GetTokenLogoURL } from './../components/CurrencyLogo/index'
import { Currency, Token } from '@niifi/godzilla2-sdk'
import { useCallback, useState } from 'react'
import { useActiveWeb3React } from 'hooks/web3'

export default function useAddTokenToMetamask(currencyToAdd: Currency | undefined): {
  addToken: () => void
  success: boolean | undefined
} {
  const { library } = useActiveWeb3React()

  const token: Token | undefined = currencyToAdd?.wrapped

  const [success, setSuccess] = useState<boolean | undefined>()

  const tokenImage = GetTokenLogoURL(token?.address || '')

  const addToken = useCallback(() => {
    if (library && library.provider.isMetaMask && library.provider.request && token) {
      library.provider
        .request({
          method: 'wallet_watchAsset',
          params: {
            //@ts-ignore // need this for incorrect ethers provider type
            type: 'ERC20',
            options: {
              address: token.address,
              symbol: token.symbol,
              decimals: token.decimals,
              image: tokenImage,
            },
          },
        })
        .then((success) => {
          setSuccess(success)
        })
        .catch(() => setSuccess(false))
    } else {
      setSuccess(false)
    }
  }, [library, token, tokenImage])

  return { addToken, success }
}
