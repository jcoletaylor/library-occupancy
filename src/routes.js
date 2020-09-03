const { settings } = require('./config/settings')
const { FetchHelper } = require('./lib/fetch_helper')
const routes = require('express').Router()

const getRequest = (locationId) => {
  const endpoint = 'https://library-occupancy.s3.amazonaws.com'
  const path = `/${settings.aws.s3.key_prefix}/${locationId}`
  const req = {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    endpoint,
    path
  }
  return req
}

const getJson = async (locationId) => {
  const net = new FetchHelper()
  const req = getRequest(locationId)
  const resp = await net.get(req)
  const data = await resp.json()
  return data
}

routes.get('/occupancy/:location_id', async (req, res) => {
  const locationId = req.params.location_id
  const data = await getJson(locationId)
  res.send({ data })
})

module.exports = {
  routes
}
