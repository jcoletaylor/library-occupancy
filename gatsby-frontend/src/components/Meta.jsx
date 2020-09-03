import React from "react"
import { Helmet } from "react-helmet"
export default function Meta() {
  return (
    <div className="application">
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>University of Florida Smathers Libraries Occupancy</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma.min.css"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          href="css/occupancy.css"
          type="text/css"
          media="all"
        />
      </Helmet>
    </div>
  )
}
