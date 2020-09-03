import React from "react"
import SingleFacility from './SingleFacility'
import FacilityMap from './FacilityMap'

const buildFacility = (location_id) => {
    const facility = FacilityMap[location_id]
    return (
        <SingleFacility facility={facility} />
    )
}

export default function CounterColumns() {
  return (
    <>
      <div className="columns">
        <div className="column">{buildFacility("UFL002")}</div>
        <div className="column">{buildFacility("UFL003")}</div>
        <div className="column">{buildFacility("UFL006")}</div>
      </div>
      <div className="columns">
        <div className="column">{buildFacility("UFL005")}</div>
        <div className="column">{buildFacility("UFL004")}</div>
        <div className="column">{buildFacility("UFL001")}</div>
      </div>
      <div className="columns">
        <div className="column">{buildFacility("UFLRM1")}</div>
        <div className="column">{buildFacility("UFLGRR")}</div>
        <div className="column">{buildFacility("UFLPCM")}</div>
      </div>
      <div className="columns">
        <div className="column"></div>
        <div className="column">{buildFacility("UFLLAT")}</div>
        <div className="column"></div>
      </div>
    </>
  )
}
