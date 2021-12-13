import { Version, VersionUpgrade } from 'types/general.d'

export function getVersionUpgrade(base: Version, update: Version): VersionUpgrade {
  if (update.major > base.major) {
    return VersionUpgrade.MAJOR
  }
  if (update.major < base.major) {
    return VersionUpgrade.NONE
  }
  if (update.minor > base.minor) {
    return VersionUpgrade.MINOR
  }
  if (update.minor < base.minor) {
    return VersionUpgrade.NONE
  }
  return update.patch > base.patch ? VersionUpgrade.PATCH : VersionUpgrade.NONE
}
