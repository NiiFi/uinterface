import React from 'react'
import { shortenDecimalValues } from 'utils'
import { TYPE } from 'theme'

export default function HealthFactor({ value }: { value: string }) {
  const valueFormated = Number(value)
  let renderComponent = <TYPE.common>-</TYPE.common>

  if (valueFormated >= 1.5) {
    renderComponent = <TYPE.green fontSize={14}>{shortenDecimalValues(value)}</TYPE.green>
  } else if (valueFormated < 1.1 && valueFormated > 0) {
    renderComponent = <TYPE.red fontSize={14}>{shortenDecimalValues(value)}</TYPE.red>
  } else {
    renderComponent = <TYPE.orange fontSize={14}>{shortenDecimalValues(value)}</TYPE.orange>
  }

  return <>{renderComponent}</>
}
