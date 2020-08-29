const path = require('path')
const environment = process.env.NODE_ENV || 'local'
const config = require('./config')

const settings = config[environment]
const appRoot = path.join(__dirname, '../../')

module.exports = {
  settings,
  appRoot
}
