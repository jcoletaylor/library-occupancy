import React, { useState } from "react"
import Hero from "./Hero"
import FacilityMenu from "./FacilityMenu"
import HoursWarning from "./HoursWarning"
import FacilityFactory from "./FacilityFactory"
import Footer from "./Footer"

export default function App() {
  const [activeLocation, setActiveLocation] = useState("all")
  return (
    <div id="app">
      <Hero />
      <HoursWarning />
      <section className="columns">
        <div className="column is-2">
          <section className="section">
            <FacilityMenu
              location_id={activeLocation}
              setActiveLocation={setActiveLocation}
            />
          </section>
        </div>

        <div className="column is-10">
          <section className="section">
            <FacilityFactory location_id={activeLocation} />
          </section>
        </div>
      </section>
      <Footer />
    </div>
  )
}
