import React from "react"
import FacilityMap from "./FacilityMap"
import MenuItem from "./MenuItem"

export default function FacilityTabs(props) {
  const changeMenuView = tab => {
    return e => {
      e.preventDefault()
      props.setActiveLocation(tab)
    }
  }
  const getIsActive = tab => {
    return tab === props.location_id ? "is-active" : null
  }
  return (
    <aside className="menu">
      <p className="menu-label">
        <span class="icon">
          <i class="fas fa-home"></i>&nbsp;
        </span>
        All
      </p>
      <ul className="menu-list">
        <MenuItem
          facility={FacilityMap.all}
          changeMenuView={changeMenuView}
          getIsActive={getIsActive}
        />
      </ul>
      <p className="menu-label">
        <span class="icon">
          <i class="fas fa-book"></i>&nbsp;
        </span>
        Smathers Libraries
      </p>
      <ul className="menu-list">
        <MenuItem
          facility={FacilityMap.UFL002}
          changeMenuView={changeMenuView}
          getIsActive={getIsActive}
        />
        <MenuItem
          facility={FacilityMap.UFL003}
          changeMenuView={changeMenuView}
          getIsActive={getIsActive}
        />
        <MenuItem
          facility={FacilityMap.UFL006}
          changeMenuView={changeMenuView}
          getIsActive={getIsActive}
        />
        <MenuItem
          facility={FacilityMap.UFL005}
          changeMenuView={changeMenuView}
          getIsActive={getIsActive}
        />
        <MenuItem
          facility={FacilityMap.UFL004}
          changeMenuView={changeMenuView}
          getIsActive={getIsActive}
        />
        <MenuItem
          facility={FacilityMap.UFL001}
          changeMenuView={changeMenuView}
          getIsActive={getIsActive}
        />
        <MenuItem
          facility={FacilityMap.UFLRM1}
          changeMenuView={changeMenuView}
          getIsActive={getIsActive}
        />
        <MenuItem
          facility={FacilityMap.UFLGRR}
          changeMenuView={changeMenuView}
          getIsActive={getIsActive}
        />
        <MenuItem
          facility={FacilityMap.UFLPCM}
          changeMenuView={changeMenuView}
          getIsActive={getIsActive}
        />
        <MenuItem
          facility={FacilityMap.UFLLAT}
          changeMenuView={changeMenuView}
          getIsActive={getIsActive}
        />
      </ul>
    </aside>
  )
}
