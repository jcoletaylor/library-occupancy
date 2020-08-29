const fetch = require('node-fetch')
const { S3Client } = require('../src/aws/s3')
jest.mock('node-fetch')
jest.mock('../src/aws/s3')
S3Client.uploadJson = async (buff, locationId) => { return true }

const { getMockData } = require('./helpers')

const { Loader } = require('../src/loader')

describe('Loader', () => {
  beforeEach(() => {
    fetch.mockClear()
  })
  it('should be able to load all location Ids', async () => {
    const sampleXml = getMockData('sample_result.xml')
    fetch.mockResolvedValue({
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
