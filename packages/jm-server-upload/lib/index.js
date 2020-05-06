const express = require('express')
const fs = require('fs-extra')
const multer = require('multer')
const path = require('path')
const { ObjectId } = require('bson')

function genId () {
  return new ObjectId().toString()
}

module.exports = function (opts = {}) {
  const { upload_dir: uploadDir = process.cwd() + '/uploads', upload_prefix: uploadPrefix = '', prefix = '/', fields } = opts

  fs.ensureDir(uploadDir)
    .catch(err => {
      console.error(err)
    })

  const defaultStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${uploadDir}${uploadPrefix}`)
    },
    filename: function (req, file, cb) {
      cb(null, genId() + path.extname(file.originalname))
    }
  })

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
