const LibraryFacility = (name, locationId, prefix = 'uf-lib') => {
  return {
    name, locationId, prefix
  }
}

const OCCUPANCY_LEVELS = {
  SAFE: 'safe',
  WARNING: 'warning',
  DANGER: 'danger'
}

const OCCUPANCY_LEVEL_RANGES = {
  SAFE_MAXIUMUM: 50,
  WARNING_MAXIUMUM: 80
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

  const getPercentage = (limit, current) => {
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
    return pct
  }

  const safeOccupancyMinimum = (min) => {
    const safeMin = parseInt(min.toString(), 10)
    if (safeMin < 0) {
      return 0
    }
    return safeMin
  }

  const formatDate = (ds) => {
    const d = new Date(Date.parse(ds.toString()))
    let minutes = d.getMinutes()
    minutes = (minutes < 10 ? `0${minutes}` : `${minutes}`)
    return `${d.toDateString()}, ${d.getHours()}:${minutes}`
  }

  const getLevel = (pct) => {
    let level = OCCUPANCY_LEVELS.SAFE
    if ((pct > OCCUPANCY_LEVEL_RANGES.SAFE_MAXIUMUM) && (pct <= OCCUPANCY_LEVEL_RANGES.WARNING_MAXIUMUM)) {
      level = OCCUPANCY_LEVELS.WARNING
    } else if (pct > OCCUPANCY_LEVEL_RANGES.WARNING_MAXIUMUM) {
      level = OCCUPANCY_LEVELS.DANGER
    }
    return level
  }

  const getFillPercentage = (radius, pct) => {
    const c = Math.PI * (radius * 2)
    const fillPct = ((100 - pct) / 100) * c
    return fillPct
  }

  const updateBar = (pct) => {
    const containerClass = 'facility-container'
    const barSelector = `#${containerId} .${containerClass} .svg-circle .bar-fill`
    const bar = document.querySelector(barSelector)
    const level = getLevel(pct)
    const radius = bar.getAttribute('r')
    const fillPct = getFillPercentage(radius, pct)
    bar.classList.remove(OCCUPANCY_LEVELS.SAFE, OCCUPANCY_LEVELS.WARNING, OCCUPANCY_LEVELS.DANGER)
    bar.classList.add(level)
    bar.style.strokeDashoffset = fillPct
  }

  const updateContainer = (pct) => {
    const containerClass = 'facility-container'
    const contClass = `#${containerId} .${containerClass}`
    const container = document.querySelector(contClass)
    container.setAttribute('data-pct', Math.round(pct))
  }

  const updateOccupancyTotal = (current, limit) => {
    const occupancySelector = `#${containerId} .occupancy-total`
    const total = document.querySelector(occupancySelector)
    total.innerHTML = `Occupancy: ${current} of ${limit}`
  }

  const updateFacilityName = () => {
    const facilitySelector = `#${containerId} .facility`
    const fac = document.querySelector(facilitySelector)
    fac.innerHTML = `${facility.name}`
  }

  const updateCurrentAsOf = (data) => {
    const asOfSelector = `#${containerId} .current-as-of`
    const asOf = document.querySelector(asOfSelector)
    asOf.innerHTML = `Updated: ${formatDate(data.current_as_of)}`
  }

  const draw = async () => {
    const { data } = await getOccupancy()
    const current = safeOccupancyMinimum(data.occupancy)
    const limit = data.occupancy_limit
    const pct = getPercentage(limit, current)

    // add the level and fill percentage to the bar
    updateBar(pct)

    // update the overall container percentage
    updateContainer(pct)

    // update the current vs total
    updateOccupancyTotal(current, limit)

    // list the name of the space
    updateFacilityName()

    // note the timestamp for when it was last updated
    updateCurrentAsOf(data)
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

  const buildCard = () => {
    return `
        <div class="card-header has-background-info-light">
            <div class="card-header-title is-centered facility">Library Occupancy</div>
        </div>
        <div class="card-content">
          <div class="occupancy-total is-centered"></div>
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
          <div class="content is-centered is-small current-as-of"></div>
        </div>
    `
  }

  const render = () => {
    docOnReady(async () => {
      const container = document.getElementById(containerId)
      container.innerHTML = buildCard()
      await draw()
    })
  }

  return {
    render,
    draw
  }
}
