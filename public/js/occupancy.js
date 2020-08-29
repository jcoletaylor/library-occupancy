const LibraryFacility = (name, locationId, prefix = 'uf-lib') => {
  return {
    name, locationId, prefix
  }
}

const LibraryOccupancyWidget = (containerId, facility) => {
  const getUrl = () => {
    const baseUrl = 'https://library-occupancy.s3.amazonaws.com'
    const url = `${baseUrl}/${facility.prefix}/${facility.locationId}`
    return url
  }
  const getOccupancy = async () => {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    }
    const resp = await fetch(getUrl(), options)
    const occupancyData = await resp.json()
    return {
      data: occupancyData
    }
  }

  const draw = async () => {
    const { data } = await getOccupancy()
    const containerClass = 'facility-container'
    const barSelector = `#${containerId} .${containerClass} .svg-circle .bar-fill`
    const bar = document.querySelector(barSelector)
    const r = bar.getAttribute('r')
    const c = Math.PI * (r * 2)
    const current = data.occupancy
    const limit = data.occupancy_limit
    let pct = 100 - (((limit - current) / limit) * 100)

    if (isNaN(pct)) {
      pct = 100
    }

    if (pct < 0) {
      pct = 0
    }
    if (pct > 100) {
      pct = 100
    }

    const fillPct = ((100 - pct) / 100) * c

    bar.style.strokeDashoffset = fillPct
    const contClass = `#${containerId} .${containerClass}`
    const container = document.querySelector(contClass)
    container.setAttribute('data-pct', pct)

    const occupancySelector = `#${containerId} .occupancy-total`
    const total = document.querySelector(occupancySelector)
    total.innerHTML = current + ' of ' + limit

    const facilitySelector = `#${containerId} .facility`
    const fac = document.querySelector(facilitySelector)
    fac.innerHTML = `${facility.name} Occupancy`

    const asOfSelector = `#${containerId} .current-as-of`
    const asOf = document.querySelector(asOfSelector)
    asOf.innerHTML = `Current as of: ${data.current_as_of}`
  }

  const docOnReady = (fn) => {
    // see if DOM is already available
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // call on next available tick
      setTimeout(fn, 1)
    } else {
      document.addEventListener('DOMContentLoaded', fn)
    }
  }

  const init = () => {
    return `
        <h1 class="facility">Library Occupancy</h1>
        <h2 class="occupancy-total"></h2>

        <div class="facility-container" data-pct="100">
            <svg class="svg-circle" width="200" height="200" viewPort="0 0 100 100" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <circle r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48" stroke-dashoffset="0">
                </circle>
                <circle class="bar-fill" r="90" cx="100" cy="100" fill="transparent" stroke-dasharray="565.48"
                    stroke-dashoffset="0">
                </circle>
            </svg>
        </div>

        <h3 class="current-as-of"></h3>
    `
  }

  const render = () => {
    docOnReady(async () => {
      const container = document.getElementById(containerId)
      container.innerHTML = init()
      await draw()
    })
  }

  return {
    render
  }
}
