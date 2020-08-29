const fs = require('fs')
const path = require('path')
const { appRoot } = require('../src/config/settings')
const moment = require('moment')

const fetch = require('node-fetch')
jest.mock('node-fetch')

const { OccupancyClient } = require('../src/occupancy_client')

function getMockData (fileName) {
  const mockRoot = path.join(appRoot, 'test/__mocks__')
  const data = fs.readFileSync(path.join(mockRoot, fileName)).toString()
  return data
}

describe('Occupancy Client', () => {
  beforeEach(() => {
    fetch.mockClear()
  })
  it('should be able to retrieve raw json for a facility', async () => {
    const sampleXml = getMockData('sample_result.xml')
    fetch.mockResolvedValue({
      status: 200,
      text: () => {
        return sampleXml
      }
    })
    const client = new OccupancyClient()
    const jsonOut = await client.retrieveRawJsonForFacility('dummy')
    const expectedResult = JSON.parse(getMockData('sample_result.json'))
    expect(jsonOut).toEqual(expectedResult)
  })
  it('should be able to retrieve data for a facility', async () => {
    const sampleXml = getMockData('sample_result.xml')
    fetch.mockResolvedValue({
      status: 200,
      text: () => {
        return sampleXml
      }
    })
    const client = new OccupancyClient()
    const jsonOut = await client.retrieveDataForFacility('dummy')
    expect(jsonOut).toEqual({
      storeId: 'apst0000',
      color: 'green',
      occDate: '2020-08-29 15:30:42',
      occLevelNow: '5',
      'occLevel-1': '5',
      'occLevel-2': '5',
      'occLevel-3': '6',
      'occLevel-4': '5',
      occLevelMax: '10',
      occLevelPct: '50.0 %'
    })
  })
  it('should be able to get parsed occupancy for a facility', async () => {
    const sampleXml = getMockData('sample_result.xml')
    fetch.mockResolvedValue({
      status: 200,
      text: () => {
        return sampleXml
      }
    })
    const client = new OccupancyClient()
    const jsonOut = await client.occupancyForFacility('dummy')
    expect(jsonOut).toEqual({
      location_id: 'apst0000',
      color: 'green',
      current_as_of: moment('2020-08-29 15:30:42'),
      occupancy: 5,
      occupancy_limit: 10,
      base_data: expect.any(Object)
    })
  })
})
