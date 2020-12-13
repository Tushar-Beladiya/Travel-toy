const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const {
  accessKey,
  secretKey,
  bucket
} = require('../config/aws');

const s3 = new aws.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});

const imageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      // console.log('file: ', file);
      const fileName = `${Date.now().toString()}-${file.originalname}`;
      cb(null, fileName);
    }
  })
});

module.exports = imageUpload;