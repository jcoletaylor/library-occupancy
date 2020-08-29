const AWS = require('aws-sdk')
const { settings } = require('../config/settings')
AWS.config.update(settings.aws.connection)
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  endpoint: settings.aws.s3.endpoint
})
class S3Client {
  static uploadJson (json, locationId) {
    return new Promise(resolve => {
      const buff = Buffer.from(json, 'utf-8')
      const uploadParams = {
        Bucket: settings.aws.s3.bucket,
        Key: `${settings.aws.s3.key_prefix}/${locationId}`,
        ContentType: 'application/json',
        Body: buff
      }
      s3.upload(uploadParams, function (err, data) {
        if (err) {
          resolve({
            status: 'error',
            data: null,
            error: err
          })
        }
        if (data) {
          resolve({
            status: 'success',
            data,
            error: null
          })
        }
      })
    })
  }
}

module.exports = {
  S3Client,
  s3
}
