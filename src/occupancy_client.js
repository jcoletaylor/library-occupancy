const moment = require('moment-timezone')
const { settings } = require('./config/settings')
const xml2js = require('xml2js')
const { FetchHelper } = require('./lib/fetch_helper')

const getTimeZone = () => {
  const tz = process.env.TZ ? process.env.TZ : 'America/New_York'
  return tz
}
class OccupancyClient {
  getTmasParams (facility) {
    const date = moment().tz(getTimeZone()).format('MM/DD/YYYY')
    return {
      fromDate: date,
      toDate: date,
      interval: 5,
      reqType: 'tdo',
      hours: 2,
      apiKey: facility.getApiKey(),
      locationId: facility.locationId
    }
  }
  getRequest (facility) {
    const req = {
      headers: {
        'Content-Type': 'application/xml'
      },
      params: this.getTmasParams(facility),
      endpoint: settings.storetraffic.endpoint,
      path: settings.storetraffic.path
    }
    return req
  }
  async retrieveRawJsonForFacility (facility) {
    const net = new FetchHelper()
    const req = this.getRequest(facility)
    const resp = await net.get(req)
    const xml = await resp.text()
    const result = await xml2js.parseStringPromise(xml)
    return result
  }

  async retrieveDataForFacility (facility) {
    const raw = await this.retrieveRawJsonForFacility(facility)
    console.log(JSON.stringify(raw))
    const data = raw.TRAFFIC.data[0].$ // this might throw, but it's okay
    return data
  }

  async occupancyForFacility (facility) {
    const data = await this.retrieveDataForFacility(facility)
    const occupancyData = {
      location_id: data.storeId,
      occupancy: parseInt(data.occLevelNow, 10),
      occupancy_limit: parseInt(data.occLevelMax, 10),
      current_as_of: moment(data.occDate).tz(getTimeZone()),
      color: data.color,
      base_data: data
    }
    return occupancyData
  }
}

module.exports = { OccupancyClient }
