import { ExplorerDataType, getExplorerLink } from './getExplorerLink'

describe('#getExplorerLink', () => {
  it('correct for tx Nahmii testnet', () => {
    expect(getExplorerLink(5553, 'abc', ExplorerDataType.TRANSACTION)).toEqual(
      'https://explorer.testnet.nahmii.io/tx/abc'
    )
  })
  it('correct for token Nahmii testnet', () => {
    expect(getExplorerLink(5553, 'abc', ExplorerDataType.TOKEN)).toEqual('https://explorer.testnet.nahmii.io/token/abc')
  })
  it('corrent for address Nahmii testnet', () => {
    expect(getExplorerLink(5553, 'abc', ExplorerDataType.ADDRESS)).toEqual(
      'https://explorer.testnet.nahmii.io/address/abc'
    )
  })
  it('unrecognized chain id defaults to Nahmii testnet', () => {
    expect(getExplorerLink(2, 'abc', ExplorerDataType.ADDRESS)).toEqual(
      'https://explorer.testnet.nahmii.io/address/abc'
    )
  })
})
