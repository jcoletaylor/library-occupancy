import React from "react"
import AllFacilities from "./AllFacilities"
import FacilityMap from "./FacilityMap"
import LibraryOccupancy from "./LibraryOccupancy"

export default function FacilityFactory(props) {
  const getFacilityWidget = () => {
    if (props.location_id === "all") {
      return <AllFacilities />
    }
    const facility = FacilityMap[props.location_id]
    return <LibraryOccupancy facility={facility} />
  }
  return <div className="container">{getFacilityWidget()}</div>
}
