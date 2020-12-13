const aws = require('aws-sdk');

const {
  accessKey,
  secretKey,
} = require('../config/aws');

const s3 = new aws.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});

module.exports = {
  // removeImage by key and s3Bucket of the old image
  removeImage(s3Bucket, key) {
    s3.deleteObject({
      Bucket: s3Bucket,
      Key: key
    }, function (err, data) {
      if (err) {
        console.log('Unable to remove image from s3.');
        console.log(err);
      } else {
        console.log('Removed image from s3.. ', data);
      }
    });
  }
}