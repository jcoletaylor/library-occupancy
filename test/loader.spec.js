global.fetch = require('node-fetch')
jest.mock('node-fetch')
const fetchTimeout = require('fetch-timeout')
jest.mock('fetch-timeout')
const { S3Client } = require('../src/aws/s3')
jest.mock('../src/aws/s3')
S3Client.uploadJson = async (buff, locationId) => { return true }

const { getMockData } = require('./helpers')

const { Loader } = require('../src/loader')

describe('Loader', () => {
  beforeEach(() => {
    fetchTimeout.mockClear()
  })
  it('should be able to load all location Ids', async () => {
    const sampleXml = getMockData('sample_result.xml')
    fetchTimeout.mockResolvedValue({
      status: 200,
      text: () => {
        return sampleXml
      }
    })
    const loader = new Loader()
    expect(async () => {
      await loader.load()
    }).not.toThrowError()
  })
})
