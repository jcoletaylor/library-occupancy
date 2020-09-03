import React from "react"

export default function MenuItem(props) {
  const { facility } = props

  const h = `#${facility.location_id}`
  return (
    <li className="is-size-7 is-uppercase">
      <a
        className={props.getIsActive(facility.location_id)}
        onClick={props.changeMenuView(facility.location_id)}
        href={h}
      >
        {facility.name}
      </a>
    </li>
  )
}
