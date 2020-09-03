import React from "react"
import CapacityCircle from "./CapacityCircle"

export default function Card(props) {
  const locationId = `${props.facility.location_id}-container`
  const formatDate = ds => {
    const d = new Date(Date.parse(ds.toString()))
    let minutes = d.getMinutes()
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    return `${d.toDateString()}, ${d.getHours()}:${minutes}`
  }
  return (
    <div className="card" id={locationId}>
      <div className="card-header has-background-info-light">
        <div className="card-header-title is-centered facility">
          {props.facility.name}
        </div>
      </div>
      <div className="card-content">
        <div className="occupancy-total is-centered">
          Occupancy {props.current} of {props.limit}
        </div>
        <CapacityCircle {...props} />
        <div className="content is-centered is-small current-as-of">
          Updated: {formatDate(props.current_as_of)}
        </div>
      </div>
    </div>
  )
}
