const path = require('path')
const environment = process.env.NODE_ENV || 'local'
const config = require('./config')

const settings = config[environment]
const appRoot = path.join(__dirname, '../../')
const publicFilePath = path.join(appRoot, 'public')

module.exports = {
  settings,
  appRoot,
  publicFilePath
}
