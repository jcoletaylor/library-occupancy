import React from "react"

const OCCUPANCY_LEVELS = {
  SAFE: "safe",
  WARNING: "warning",
  DANGER: "danger",
}

const OCCUPANCY_LEVEL_RANGES = {
  SAFE_MAXIUMUM: 50,
  WARNING_MAXIUMUM: 80,
}

const CIRCLE_R = 90
const CIRCLE_CIRC = 565.48

export default function CapacityCircle(props) {
  const getFillPercentage = pct => {
    const c = Math.PI * (CIRCLE_R * 2)
    const fillPct = ((100 - pct) / 100) * c
    return fillPct
  }
  const getLevel = pct => {
    let level = OCCUPANCY_LEVELS.SAFE
    if (
      pct > OCCUPANCY_LEVEL_RANGES.SAFE_MAXIUMUM &&
      pct <= OCCUPANCY_LEVEL_RANGES.WARNING_MAXIUMUM
    ) {
      level = OCCUPANCY_LEVELS.WARNING
    } else if (pct > OCCUPANCY_LEVEL_RANGES.WARNING_MAXIUMUM) {
      level = OCCUPANCY_LEVELS.DANGER
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
          r={CIRCLE_R}
          cx="100"
          cy="100"
          fill="transparent"
          strokeDasharray={CIRCLE_CIRC}
          strokeDashoffset="0"
        ></circle>
        <circle
          className={getBarFillClassName(props.percentage)}
          r={CIRCLE_R}
          cx="100"
          cy="100"
          fill="transparent"
          strokeDasharray={CIRCLE_CIRC}
          strokeDashoffset="0"
          style={getCircleStyle()}
        ></circle>
      </svg>
    </div>
  )
}
