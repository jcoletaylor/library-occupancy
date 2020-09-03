import React from "react"

export default function HoursWarning() {
  return (
    <div className="notification is-primary">
      <h2 className="has-text-centered">
        <strong>
          Please confirm{" "}
          <a className="is-link" href="http://www.uflib.ufl.edu/ps/hours/">
            <span class="icon">
              <i class="fas fa-calendar"></i>
            </span>
            Location Hours
          </a>{" "}
          before visiting
        </strong>
      </h2>
    </div>
  )
}
