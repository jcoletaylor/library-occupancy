import React, { useState, useEffect, useCallback } from "react"
import useInterval from "../hooks/useInterval"
import Card from "./Card"

const POLL_SECONDS = 60 * 1000

export default function LibraryOccupancy(props) {
  const [current, setCurrent] = useState(0)
  const [limit, setLimit] = useState(100)
  const [percent, setPercent] = useState(0)
  const [updatedTime, setUpdatedTime] = useState(new Date())
  const { facility } = props

  const getUrl = useCallback(() => {
    const baseUrl = "https://library-occupancy.s3.amazonaws.com"
    const url = `${baseUrl}/${facility.prefix}/${facility.location_id}`
    return url
  }, [facility])

  const getOccupancy = useCallback(async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }
    const resp = await fetch(getUrl(), options)
    const data = await resp.json()
    return data
  }, [getUrl])

  const getPercentage = (limit, current) => {
    let percentage = 100 - ((limit - current) / limit) * 100
    if (isNaN(percentage)) {
      percentage = 100
    }
    if (percentage < 0) {
      percentage = 0
    }
    if (percentage > 100) {
      percentage = 100
    }
    return percentage
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
    setPercent(data.percentage)
    setUpdatedTime(data.current_as_of)
  }, [getOccupancyData])

  useEffect(() => {
    updateComponentData()
  }, [updateComponentData])

  useInterval(async () => {
    await updateComponentData()
  }, POLL_SECONDS)

  return (
    <Card
      facility={facility}
      current={current}
      limit={limit}
      percentage={percent}
      current_as_of={updatedTime}
    />
  )
}
