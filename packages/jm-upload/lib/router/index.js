const wrapper = require('jm-ms-wrapper')
const MS = require('jm-ms-core')
const help = require('./help')
const ms = new MS()

module.exports = function (opts = {}) {
  let service = this

  const router = ms.router()
  wrapper(service.t)(router)

  router
    .use(help(service))
    .add('/', 'post', opts => {
      return opts.data
    })

  return router
}
