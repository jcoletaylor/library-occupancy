const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { publicFilePath } = require('./config/settings')

const { routes } = require('./routes')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', routes)
app.use('/static', express.static(publicFilePath))

module.exports = {
  app
}
