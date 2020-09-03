import React from "react"
import LibraryOccupancy from "./LibraryOccupancy"
import FacilityMap from "./FacilityMap"

const getFacility = location_id => {
  return FacilityMap[location_id]
}

export default function AllFacilities() {
  return (
    <>
      <div className="columns">
        <div className="column">
          <LibraryOccupancy facility={getFacility("UFL002")} />
        </div>
        <div className="column">
          <LibraryOccupancy facility={getFacility("UFL003")} />
        </div>
        <div className="column">
          <LibraryOccupancy facility={getFacility("UFL006")} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <LibraryOccupancy facility={getFacility("UFL005")} />
        </div>
        <div className="column">
          <LibraryOccupancy facility={getFacility("UFL004")} />
        </div>
        <div className="column">
          <LibraryOccupancy facility={getFacility("UFL001")} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <LibraryOccupancy facility={getFacility("UFLRM1")} />
        </div>
        <div className="column">
          <LibraryOccupancy facility={getFacility("UFLGRR")} />
        </div>
        <div className="column">
          <LibraryOccupancy facility={getFacility("UFLPCM")} />
        </div>
      </div>
      <div className="columns">
        <div className="column"></div>
        <div className="column">
          <LibraryOccupancy facility={getFacility("UFLLAT")} />
        </div>
        <div className="column"></div>
      </div>
    </>
  )
}
