import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

type ProgressCircleProps = {
  color: string
  percentage: number
  trailColor?: string
}

function ProgressCircle({ ...props }: ProgressCircleProps) {
  const { percentage, color, trailColor } = props

  return (
    <CircularProgressbar
      value={percentage}
      styles={buildStyles({
        rotation: 0.5,
        strokeLinecap: 'butt',
        pathColor: color,
        trailColor: trailColor || '#C9F0ED',
      })}
    />
  )
}

export default ProgressCircle
