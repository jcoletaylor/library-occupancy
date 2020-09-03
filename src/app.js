const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { publicFilePath } = require('./config/settings')
const staticFiles = path.join(publicFilePath, 'static')
const reactFiles = path.join(publicFilePath, 'react')
const { routes } = require('./routes')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', routes)
app.use('/static', express.static(staticFiles))
app.use(express.static(reactFiles))
app.get('/react', function (req, res) {
  res.sendFile(path.join(reactFiles, 'index.html'))
})

module.exports = {
  app
}
