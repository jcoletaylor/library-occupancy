import React from "react"
import Meta from "./Meta"
import Hero from "./Hero"
import HoursWarning from "./HoursWarning"
import CounterColumns from "./CounterColumns"

export default function App() {
  return (
    <div className="application">
      <Meta />
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
