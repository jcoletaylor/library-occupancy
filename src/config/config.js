require('dotenv').config()

module.exports = {
  local: {
    logger: {
      level: 'debug',
      name: 'library-occupancy-logs'
    },
    storetraffic: {
      endpoint: 'https://www.smssoftware.net',
      path: '/tms/manTrafExp',
      public_api_key: process.env.STORETRAFFIC_API_KEY,
      locationIds: ['apst0000']
    },
    aws: {
      connection: {
        region: 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      },
      s3: {
        endpoint: 'http://localhost:4572',
        bucket: 'library-occupancy'
      }
    }
  },
  test: {
    logger: {
      level: 'debug',
      name: 'library-occupancy-logs'
    },
    storetraffic: {
      endpoint: 'http://localhost',
      path: '/dummy',
      public_api_key: 'nope',
      locationIds: ['fake']
    },
    aws: {
      connection: {
        region: 'us-east-1',
        accessKeyId: 'DUMMY',
        secretAccessKey: 'DUMMY'
      },
      s3: {
        endpoint: 'http://localhost:4572',
        bucket: 'library-occupancy'
      }
    }
  }
}
