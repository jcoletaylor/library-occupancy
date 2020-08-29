const { settings } = require('./config/settings')
const { OccupancyClient } = require('./occupancy_client')
const { Facility } = require('./facility')
const { S3Client } = require('./aws/s3')

class Loader {
  async load () {
    const locationIds = settings.storetraffic.locationIds
    for (const locationId of locationIds) {
      // this way we do not hit the API all at once
      console.log(`Loading ${locationId}`)
      await this.loadLocation(locationId)
    }
  }

  async loadLocation (locationId) {
    const facility = new Facility(locationId)
    const client = new OccupancyClient()
    let result = { status: 'unstarted' }
    try {
      const data = await client.occupancyForFacility(facility)
      const json = JSON.stringify(data)
      const response = await S3Client.uploadJson(json, locationId)
      result = { location: locationId, status: 'upload attempted', response }
      console.log(result)
    } catch (err) {
      console.error(err)
      result = { status: 'error', message: err.message }
    }
    return result
  }
}

module.exports = { Loader }
