const fetch = require('node-fetch')
const url = require('url')
const querystring = require('querystring')
const { HttpMethod } = require('../lib/http_method')

class FetchHelper {
  async get (req) {
    const resp = await this.request(HttpMethod.GET, req)
    return resp
  }

  async request (method, req) {
    if (!req.data) {
      req.data = {}
    }
    if (!req.headers) {
      req.headers = {}
    }
    if (req.params) {
      const params = querystring.stringify(req.params)
      req.path = `${req.path}?${params}`
    }
    const uri = url.resolve(req.endpoint, req.path)
    const options = this.getFetchOptions(method, req)
    const response = await fetch(uri, options)
    return response
  }

  getFetchOptions (method, req) {
    const options = {
      method,
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, (req.headers || {}))
    }
    if (Object.keys(req.data).length === 0 && req.data.constructor === Object) {
      return options
    }
    options.body = JSON.stringify(req.data)
    return options
  }
}

module.exports = { FetchHelper }
