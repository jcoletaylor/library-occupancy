import React, { useState, useEffect, useCallback } from "react"
import useInterval from "../hooks/useInterval"
import Card from "./Card"
import * as C from "../Constants"

export default function LibraryOccupancy(props) {
  const [current, setCurrent] = useState(0)
  const [limit, setLimit] = useState(100)
  const [percentage, setPercentage] = useState(0)
  const [updatedTime, setUpdatedTime] = useState(new Date())
  const { facility } = props

  const getOccupancy = useCallback(async () => {
    const url = `${C.BASE_S3_URL}/${facility.prefix}/${facility.location_id}`
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }
    const resp = await fetch(url, options)
    const data = await resp.json()
    return data
  }, [facility])

  const getPercentage = (lim, curr) => {
    let pct = 100 - ((lim - curr) / lim) * 100
    if (isNaN(pct)) {
      pct = 100
    }
    if (pct < 0) {
      pct = 0
    }
    if (pct > 100) {
      pct = 100
    }
    return pct
  }

  const safeOccupancyMinimum = min => {
    const safeMin = parseInt(min.toString(), 10)
    if (safeMin < 0) {
      return 0
    }
    return safeMin
  }

  const getOccupancyData = useCallback(async () => {
    const { occupancy, occupancy_limit, current_as_of } = await getOccupancy()
    const currentSafe = safeOccupancyMinimum(occupancy)
    return {
      current: currentSafe,
      limit: occupancy_limit,
      percentage: getPercentage(occupancy_limit, currentSafe),
      current_as_of,
    }
  }, [getOccupancy])

  const updateComponentData = useCallback(async () => {
    const data = await getOccupancyData()
    setCurrent(data.current)
    setLimit(data.limit)
    setPercentage(data.percentage)
    setUpdatedTime(data.current_as_of)
  }, [getOccupancyData])

  useEffect(() => {
    updateComponentData()
  }, [updateComponentData])

  useInterval(async () => {
    await updateComponentData()
  }, C.POLL_SECONDS)

  return (
    <Card
      facility={facility}
      current={current}
      limit={limit}
      percentage={percentage}
      current_as_of={updatedTime}
    />
  )
}
