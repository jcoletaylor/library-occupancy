import React from "react"
import * as C from "../Constants"

export default function CapacityCircle(props) {
  const getFillPercentage = pct => {
    const c = Math.PI * (C.CIRCLE_R * 2)
    const fillPct = ((100 - pct) / 100) * c
    return fillPct
  }
  const getLevel = pct => {
    let level = C.OCCUPANCY_LEVELS.SAFE
    if (
      pct > C.OCCUPANCY_LEVEL_RANGES.SAFE_MAXIUMUM &&
      pct <= C.OCCUPANCY_LEVEL_RANGES.WARNING_MAXIUMUM
    ) {
      level = C.OCCUPANCY_LEVELS.WARNING
    } else if (pct > C.OCCUPANCY_LEVEL_RANGES.WARNING_MAXIUMUM) {
      level = C.OCCUPANCY_LEVELS.DANGER
    }
    return level
  }
  const getBarFillClassName = pct => {
    const level = getLevel(pct)
    return `bar-fill ${level}`
  }
  const getCircleStyle = () => {
    return {
      strokeDashoffset: getFillPercentage(props.percentage),
    }
  }

  return (
    <div
      className="facility-container has-text-centered"
      data-pct={Math.round(props.percentage)}
    >
      <svg
        className="svg-circle"
        width="200"
        height="200"
        viewport="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          r={C.CIRCLE_R}
          cx="100"
          cy="100"
          fill="transparent"
          strokeDasharray={C.CIRCLE_CIRC}
          strokeDashoffset="0"
        ></circle>
        <circle
          className={getBarFillClassName(props.percentage)}
          r={C.CIRCLE_R}
          cx="100"
          cy="100"
          fill="transparent"
          strokeDasharray={C.CIRCLE_CIRC}
          strokeDashoffset="0"
          style={getCircleStyle()}
        ></circle>
      </svg>
    </div>
  )
}
