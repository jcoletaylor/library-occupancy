const { OccupancyClient } = require('../src/occupancy_client')
const { Facility } = require('../src/facility')

async function display () {
  const client = new OccupancyClient()
  const facility = new Facility('apst0000')
  const data = await client.occupancyForFacility(facility)
  return data
}

display().then((json) => {
  console.log(json)
  process.exit(0)
}).catch((err) => {
  console.error(err)
  process.exit(1)
}).finally(() => {
  process.exit(1)
})
