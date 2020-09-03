import React from "react"
import FacilityMap from "./FacilityMap"
export default function FacilityTabs(props) {
  const getIsActive = tab => {
    return tab === props.active_tab ? "is-active" : null
  }
  const changeMenuView = tab => {
    return e => {
      e.preventDefault()
      props.setActiveTab(tab)
    }
  }
  const buildMenuItem = facility => {
    const h = `#${facility.location_id}`
    return (
      <li className="is-size-7">
        <a
          className={getIsActive(facility.location_id)}
          onClick={changeMenuView(facility.location_id)}
          href={h}
        >
          {facility.name}
        </a>
      </li>
    )
  }
    return (
      <aside className="menu">
        <p className="menu-label">Home</p>
        <ul className="menu-list">
          {buildMenuItem(FacilityMap.all)}
        </ul>
        <p className="menu-label">Smathers Libraries</p>
        <ul className="menu-list">
          {buildMenuItem(FacilityMap.UFL002)}
          {buildMenuItem(FacilityMap.UFL003)}
          {buildMenuItem(FacilityMap.UFL006)}
          {buildMenuItem(FacilityMap.UFL005)}
          {buildMenuItem(FacilityMap.UFL004)}
          {buildMenuItem(FacilityMap.UFL001)}
          {buildMenuItem(FacilityMap.UFLRM1)}
          {buildMenuItem(FacilityMap.UFLGRR)}
          {buildMenuItem(FacilityMap.UFLPCM)}
          {buildMenuItem(FacilityMap.UFLLAT)}
        </ul>
      </aside>
    )
}
