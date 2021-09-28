import { useEffect, useState } from 'react'
import { useActiveWeb3React } from 'hooks/web3'
import { BigNumber } from 'ethers'

// gets the current timestamp from the blockchain
export default function useCurrentBlockTimestamp(): BigNumber {
  const { library } = useActiveWeb3React()
  const [timestamp, setTimestamp] = useState(BigNumber.from(0))

  useEffect(() => {
    if (!!library) {
      library
        .getBlock(library.getBlockNumber())
        .then((block: any) => {
          setTimestamp(BigNumber.from(block.timestamp))
        })
        .catch((e: Error) => {
          console.log(e)
        })
    }
  }, [library])

  return timestamp
}
