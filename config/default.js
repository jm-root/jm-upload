module.exports = {
  lng: 'zh_CN',
  service_name: 'upload',
  prefix: '/upload',
  modules: {
    'jm-server-upload': {
      config: {
        prefix: '/'
      }
    },
    'jm-upload': {
      prefix: '/'
    }
  }
}
