import React from "react"
import CounterColumns from './CounterColumns'
import FacilityMap from './FacilityMap'
import SingleFacility from './SingleFacility'

export default function FacilityFactory(props) {
    const getFacilityWidget = () => {
        if (props.active_tab === "all") {
            return <CounterColumns />
        }
        const facility = FacilityMap[props.active_tab]
        return <SingleFacility facility={facility} />
    }
    return (
      <div className="container">
        {getFacilityWidget()}
      </div>
    )
}