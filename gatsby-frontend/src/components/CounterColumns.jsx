import React from "react"
import LibraryOccupancy from "./LibraryOccupancy"
import LibraryFacility from "./LibraryFacility"

export default function CounterColumns() {
  return (
    <>
      <div className="columns">
        <div className="column">
          <LibraryOccupancy
            facility={LibraryFacility("Library West", "UFL002")}
          />
        </div>
        <div className="column">
          <LibraryOccupancy
            facility={LibraryFacility("Marston Science Library", "UFL003")}
          />
        </div>
        <div className="column">
          <LibraryOccupancy
            facility={LibraryFacility(
              "Health Science Center Library",
              "UFL006"
            )}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <LibraryOccupancy
            facility={LibraryFacility(
              "Architecture and Fine Arts Library",
              "UFL005"
            )}
          />
        </div>
        <div className="column">
          <LibraryOccupancy
            facility={LibraryFacility("Education Library", "UFL004")}
          />
        </div>
        <div className="column">
          <LibraryOccupancy
            facility={LibraryFacility(
              "Smathers Library - Main Entrance",
              "UFL001"
            )}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <LibraryOccupancy
            facility={LibraryFacility("Smathers Library - Room 100", "UFLRM1")}
          />
        </div>
        <div className="column">
          <LibraryOccupancy
            facility={LibraryFacility(
              "Smathers Library - Reading Room",
              "UFLGRR"
            )}
          />
        </div>
        <div className="column">
          <LibraryOccupancy
            facility={LibraryFacility(
              "Smathers Library - Panama Canal ",
              "UFLPCM"
            )}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column"></div>
        <div className="column">
          <LibraryOccupancy
            facility={LibraryFacility(
              "Smathers Library - Latin American and Caribbean Collections",
              "UFLLAT"
            )}
          />
        </div>
        <div className="column"></div>
      </div>
    </>
  )
}
