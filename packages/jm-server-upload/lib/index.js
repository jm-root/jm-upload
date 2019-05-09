const express = require('express')
const multer = require('multer')

module.exports = function (opts = {}) {
  const { upload_dir: uploadDir = process.cwd() + '/uploads', upload_prefix: uploadPrefix = '', prefix = '/', fields } = opts
  opts.dest = uploadDir + uploadPrefix

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
