import React from "react"
import AllFacilities from './AllFacilities'
import FacilityMap from './FacilityMap'
import SingleFacility from './SingleFacility'

export default function FacilityFactory(props) {
    const getFacilityWidget = () => {
        if (props.location_id === "all") {
            return <AllFacilities />
        }
        const facility = FacilityMap[props.location_id]
        return <SingleFacility facility={facility} />
    }
    return (
      <div className="container">
        {getFacilityWidget()}
      </div>
    )
}