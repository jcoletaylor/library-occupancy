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
      locationIds: ['apst0000']
    },
    poll: {
      seconds: parseInt((process.env.POLL_SECONDS || 60 * 5), 10),
      enabled: () => {
        const enabled = (process.env.POLL_ENABLED ? (process.env.POLL_ENABLED === 'Y') : false)
        return enabled
      }
    },
    aws: {
      connection: {
        region: 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
      },
      s3: {
        bucket: 'library-occupancy',
        key_prefix: 'local-test'
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
      locationIds: ['apst0000']
    },
    poll: {
      seconds: parseInt((process.env.POLL_SECONDS || 60 * 5), 10),
      enabled: () => {
        const enabled = (process.env.POLL_ENABLED ? (process.env.POLL_ENABLED === 'Y') : false)
        return enabled
      }
    },
    aws: {
      connection: {
        region: 'us-east-1',
        accessKeyId: 'DUMMY',
        secretAccessKey: 'DUMMY'
      },
      s3: {
        endpoint: 'http://localhost:4572',
        bucket: 'library-occupancy',
        key_prefix: 'test'
      }
    }
  },
  production: {
    logger: {
      level: 'info',
      name: 'library-occupancy-logs'
    },
    storetraffic: {
      endpoint: 'https://www.smssoftware.net',
      path: '/tms/manTrafExp',
      locationIds: [
        'UFL005', 'UFL002', 'UFL004',
        'UFL001', 'UFL006', 'UFL003'
      ]
    },
    poll: {
      seconds: parseInt((process.env.POLL_SECONDS || 60 * 5), 10),
      enabled: () => {
        const enabled = (process.env.POLL_ENABLED ? (process.env.POLL_ENABLED === 'Y') : false)
        return enabled
      }
    },
    aws: {
      connection: {
        region: 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
      },
      s3: {
        bucket: 'library-occupancy',
        key_prefix: 'uf-lib'
      }
    }
  }
}
