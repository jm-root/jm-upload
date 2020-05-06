const { Service } = require('jm-server')

module.exports = class extends Service {
  constructor (opts = {}) {
    super(opts)
    this.emit('ready')
  }

  router (opts) {
    const dir = `${__dirname}/../router`
    return this.loadRouter(dir, opts)
  }
}
