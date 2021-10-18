import { ExplorerDataType, getExplorerLink } from './getExplorerLink'

describe('#getExplorerLink', () => {
  it('correct for tx ropsten', () => {
    expect(getExplorerLink(3, 'abc', ExplorerDataType.TRANSACTION)).toEqual('https://explorer.testnet.nahmii.io/tx/abc')
  })
  it('correct for token ropsten', () => {
    expect(getExplorerLink(3, 'abc', ExplorerDataType.TOKEN)).toEqual('https://explorer.testnet.nahmii.io/token/abc')
  })
  it('corrent for address ropsten', () => {
    expect(getExplorerLink(3, 'abc', ExplorerDataType.ADDRESS)).toEqual('https://explorer.testnet.nahmii.io/address/abc')
  })
  it('unrecognized chain id defaults to ropsten', () => {
    expect(getExplorerLink(2, 'abc', ExplorerDataType.ADDRESS)).toEqual('https://explorer.testnet.nahmii.io/address/abc')
  })
})
