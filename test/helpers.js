const fs = require('fs')
const path = require('path')
const {
  appRoot
} = require('../src/config/settings')

function getMockData (fileName) {
  const mockRoot = path.join(appRoot, 'test/__mocks__')
  const data = fs.readFileSync(path.join(mockRoot, fileName)).toString()
  return data
}

module.exports = { getMockData }
