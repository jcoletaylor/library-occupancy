const { OccupancyClient } = require('../src/occupancy_client')

async function displayJson () {
  const client = new OccupancyClient()
  const data = await client.occupancyForFacility('apst0000')
  return data
}

displayJson().then((json) => {
  console.log(json)
  process.exit(0)
}).catch((err) => {
  console.error(err)
  process.exit(1)
}).finally(() => {
  process.exit(1)
})
