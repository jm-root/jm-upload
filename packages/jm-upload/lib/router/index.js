const { ms } = require('jm-server')

module.exports = function (service) {
  const router = ms.router()

  router
    .add('/', 'post', opts => {
      return opts.data
    })

  return router
}
