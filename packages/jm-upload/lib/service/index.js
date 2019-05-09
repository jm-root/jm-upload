const event = require('jm-event')
const t = require('../locale')

class Service {
  constructor (opts = {}) {
    event.enableEvent(this)
    this.t = t
  }
}

module.exports = Service
