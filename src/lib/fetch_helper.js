const fetchTimeout = require('fetch-timeout')
const url = require('url')
const querystring = require('querystring')
const { HttpMethod } = require('../lib/http_method')

const REQUEST_TIMEOUT_MS = 5000

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
    const uri = new url.URL(req.path, req.endpoint)
    const options = this.getFetchOptions(method, req)
    const timeoutMessage = `No response received from ${uri} within ${REQUEST_TIMEOUT_MS}`
    const response = await fetchTimeout(uri, options, REQUEST_TIMEOUT_MS, timeoutMessage)
    return response
  }

  getFetchOptions (method, req) {
    const options = {
      method,
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, (req.headers || {})),
      mode: (req.mode || 'no-cors')
    }
    if (Object.keys(req.data).length === 0 && req.data.constructor === Object) {
      return options
    }
    options.body = JSON.stringify(req.data)
    return options
  }
}

module.exports = { FetchHelper }
