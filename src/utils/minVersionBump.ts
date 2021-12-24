import { TokenInfo, TokenInfoChanges, TokenInfoChangeKey, TokenListDiff, VersionUpgrade } from 'types/general.d'

export function minVersionBump(baseList: TokenInfo[], updatedList: TokenInfo[]): VersionUpgrade {
  const diff = diffTokenLists(baseList, updatedList)
  if (diff.removed.length > 0) return VersionUpgrade.MAJOR
  if (diff.added.length > 0) return VersionUpgrade.MINOR
  if (Object.keys(diff.changed).length > 0) return VersionUpgrade.PATCH
  return VersionUpgrade.NONE
}

function compareTokenInfoProperty(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.every((el, i) => b[i] === el)
  }
  return false
}

export function diffTokenLists(base: TokenInfo[], update: TokenInfo[]): TokenListDiff {
  const indexedBase = base.reduce<{
    [chainId: number]: { [address: string]: TokenInfo }
  }>((memo, tokenInfo) => {
    if (!memo[tokenInfo.chainId]) memo[tokenInfo.chainId] = {}
    memo[tokenInfo.chainId][tokenInfo.address] = tokenInfo
    return memo
  }, {})

  const newListUpdates = update.reduce<{
    added: TokenInfo[]
    changed: {
      [chainId: number]: {
        [address: string]: TokenInfoChanges
      }
    }
    index: {
      [chainId: number]: {
        [address: string]: true
      }
    }
  }>(
    (memo, tokenInfo) => {
      const baseToken = indexedBase[tokenInfo.chainId]?.[tokenInfo.address]
      if (!baseToken) {
        memo.added.push(tokenInfo)
      } else {
        const changes: TokenInfoChanges = Object.keys(tokenInfo)
          .filter((s): s is TokenInfoChangeKey => s !== 'address' && s !== 'chainId')
          .filter((s) => {
            return !compareTokenInfoProperty(tokenInfo[s], baseToken[s])
          })
        if (changes.length > 0) {
          if (!memo.changed[tokenInfo.chainId]) {
            memo.changed[tokenInfo.chainId] = {}
          }
          memo.changed[tokenInfo.chainId][tokenInfo.address] = changes
        }
      }

      if (!memo.index[tokenInfo.chainId]) {
        memo.index[tokenInfo.chainId] = {
          [tokenInfo.address]: true,
        }
      } else {
        memo.index[tokenInfo.chainId][tokenInfo.address] = true
      }

      return memo
    },
    { added: [], changed: {}, index: {} }
  )

  const removed = base.reduce<TokenInfo[]>((list, curr) => {
    if (!newListUpdates.index[curr.chainId] || !newListUpdates.index[curr.chainId][curr.address]) {
      list.push(curr)
    }
    return list
  }, [])

  return {
    added: newListUpdates.added,
    changed: newListUpdates.changed,
    removed,
  }
}
