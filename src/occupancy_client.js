const moment = require('moment')
const { settings } = require('./config/settings')
const xml2js = require('xml2js')
const { FetchHelper } = require('./lib/fetch_helper')

class OccupancyClient {
  getTmasParams (facility) {
    return {
      fromDate: moment().format('MM/DD/YYYY'),
      toDate: moment().format('MM/DD/YYYY'),
      interval: 5,
      reqType: 'tdo',
      hours: 2,
      apiKey: settings.storetraffic.public_api_key,
      locationId: facility
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
    let data = {}
    try {
      data = raw.TRAFFIC.data[0].$
    } catch (err) {
      console.error(err)
    }
    return data
  }

  async occupancyForFacility (facility) {
    const data = await this.retrieveDataForFacility(facility)
    const occupancyData = {
      location_id: data.storeId,
      occupancy: parseInt(data.occLevelNow, 10),
      occupancy_limit: parseInt(data.occLevelMax, 10),
      current_as_of: moment(data.occDate),
      color: data.color,
      base_data: data
    }
    return occupancyData
  }
}

module.exports = { OccupancyClient }
