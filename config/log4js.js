module.exports = {
  appenders: {
    console: { type: 'console' },
    upload: {
      type: 'dateFile',
      filename: 'logs/upload',
      pattern: 'yyyyMMdd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: [ 'console' ], level: 'info' },
    upload: { appenders: [ 'console', 'upload' ], level: 'info' }
  }
}
