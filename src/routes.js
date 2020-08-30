const { settings } = require('./config/settings')
const fetch = require('node-fetch')
const routes = require('express').Router()

const getUrl = (locationId) => {
  const baseUrl = 'https://library-occupancy.s3.amazonaws.com'
  const prefix = settings.aws.s3.key_prefix
  const url = `${baseUrl}/${prefix}/${locationId}`
  return url
}

const getJson = async (locationId) => {
  const url = getUrl(locationId)
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  }
  const resp = await fetch(url, options)
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
