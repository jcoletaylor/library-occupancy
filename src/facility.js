class Facility {
  constructor (locationId) {
    this.locationId = locationId
  }

  getApiKey () {
    if (this.apiKey) {
      return this.apiKey
    }
    const envKey = `STORETRAFFIC_API_KEY_${this.locationId}`
    this.apiKey = process.env[envKey]
    return this.apiKey
  }
}

module.exports = { Facility }
