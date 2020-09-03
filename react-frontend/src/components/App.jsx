import React, { useState } from "react"
import Hero from "./Hero"
import FacilityMenu from "./FacilityMenu"
import HoursWarning from "./HoursWarning"
import FacilityFactory from "./FacilityFactory"

export default function App() {
  const [activeTab, setActiveTab] = useState("all")
  return (
    <div id="app">
      <Hero />
      <section className="columns">
        <div className="column is-2">
          <section className="section">
            <FacilityMenu active_tab={activeTab} setActiveTab={setActiveTab} />
          </section>
        </div>

        <div className="column is-10">
          <section className="section">
            <HoursWarning /> <br />
            <FacilityFactory active_tab={activeTab} />
          </section>
        </div>
      </section>
    </div>
  )
}
