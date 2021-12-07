export function getFromTo(type: string, token0: any, token1: any) {
  switch (type) {
    case 'Swap':
      if (!parseFloat(token0.amountIn)) {
        return [token1.symbol, token0.symbol, token1.amountIn, token0.amountOut]
      }
      break
    case 'Mint':
      return [token0.symbol, token1.symbol, token0.amountIn, token1.amountIn]
    case 'Burn':
      return [token0.symbol, token1.symbol, token0.amountOut, token1.amountOut]
  }

  return [token0.symbol, token1.symbol, token0.amountIn, token1.amountOut]
}
