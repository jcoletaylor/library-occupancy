const fetch = require('node-fetch')
jest.mock('node-fetch')

const request = require('supertest')
const { app } = require('../src/app')
const { getMockData } = require('./helpers')

describe('Library Occupancy API', () => {
  beforeEach(() => {
    fetch.mockClear()
  })
  it('GET /occupancy/:location_id', async () => {
    const raw = getMockData('sample_from_s3.json')
    const expectedData = JSON.parse(raw)
    fetch.mockResolvedValue({
      status: 200,
      json: () => {
        return expectedData
      }
    })
    const url = '/occupancy/apst0000'
    const response = await request(app)
      .get(url)
      .type('json')
      .set('Accept', 'application/json')
    expect(response.body.data).toEqual(expectedData)
  })
})
