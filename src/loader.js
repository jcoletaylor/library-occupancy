const { settings } = require('./config/settings')
const { OccupancyClient } = require('./occupancy_client')
const { Facility } = require('./facility')
const { S3Client } = require('./aws/s3')

class Loader {
  async load () {
    const locationIds = settings.storetraffic.locationIds
    const promises = locationIds.map(async (locationId) => {
      await this.loadLocation(locationId)
    })
    await Promise.allSettled(promises)
  }

  async loadLocation (locationId) {
    const facility = new Facility(locationId)
    const client = new OccupancyClient()
    let result = { status: 'unstarted' }
    try {
      const data = await client.occupancyForFacility(facility)
      const json = JSON.stringify(data)
      const response = await S3Client.uploadJson(json, locationId)
      result = { status: 'upload attempted', response }
    } catch (err) {
      console.error(err)
      result = { status: 'error', message: err.message }
    }
    return result
  }
}

module.exports = { Loader }
