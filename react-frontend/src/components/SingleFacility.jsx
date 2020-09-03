import React from "react"
import LibraryOccupancy from './LibraryOccupancy'

export default function SingleFacility(props) {
    return (
        <LibraryOccupancy
            facility={props.facility}
        />
    )
}