import React from "react"
import Hero from "./Hero"
import HoursWarning from "./HoursWarning"
import CounterColumns from "./CounterColumns"

export default function App() {
  return (
    <div className="application">
      <Hero />
      <section className="section">
        <div className="container">
          <HoursWarning />
          <CounterColumns />
        </div>
      </section>
    </div>
  )
}
