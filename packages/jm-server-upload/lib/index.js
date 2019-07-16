const express = require('express')
const multer = require('multer')
const path = require('path')
const { ObjectId } = require('bson')

function genId () {
  return new ObjectId().toString()
}

module.exports = function (opts = {}) {
  const defaultStorage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, genId() + path.extname(file.originalname))
    }
  })

  const { upload_dir: uploadDir = process.cwd() + '/uploads', upload_prefix: uploadPrefix = '', prefix = '/', fields } = opts
  opts.dest = uploadDir + uploadPrefix
  opts.storage || (opts.storage = defaultStorage)

  const router = express.Router()
  const upload = multer(opts)
  let filter = upload.any()
  if (fields && Object.keys(fields).length) {
    let v = []
    for (let name in fields) {
      v.push({
        name: name,
        maxCount: fields[name]
      })
    }
    filter = upload.fields(v)
  }
  router.use(prefix, filter)
  router.use(prefix, (req, res, next) => {
    req.body.files = req.files
    next()
  })

  this.on('open', () => {
    this.servers.http.middle.use(router)
  })
  return router
}
