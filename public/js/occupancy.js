const Occupancy = (containerId, circleBarId, occupancyTotalId, facility) => {
  const getOccupancy = async () => {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    }
    const url = 'https://library-occupancy.s3.amazonaws.com/local-test/apst0000'
    const resp = await fetch(url, options)
    const occupancyData = await resp.json()
    return {
      data: occupancyData
    }
  }

  const formatDate = (d) => {
    // const out = `${d.getMonth()}-${d.getDate()}-${d.getYear()} ${d.getHours()}:${d.getMinutes()}`
    return d
  }

  const draw = async () => {
    const { data } = await getOccupancy()
    const bar = document.getElementById(circleBarId)
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
    const container = document.getElementById(containerId)
    container.setAttribute('data-pct', pct)

    const total = document.getElementById(occupancyTotalId)
    total.innerHTML = current + ' of ' + limit

    const fac = document.getElementById('facility')
    fac.innerHTML = `${facility} Occupancy`

    const asOf = document.getElementById('current-as-of')
    asOf.innerHTML = `Current as of: ${formatDate(data.current_as_of)}`
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
    docOnReady(async () => {
      await draw()
    })
  }

  return {
    getOccupancy,
    draw,
    init
  }
}
