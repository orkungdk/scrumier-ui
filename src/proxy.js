export const proxy = {
  baseUrl: {
    local: 'http://localhost:8090'
  },
  service: {
    authentication: {
      path: '/authentication',
      methods: {
        register: ''
      }
    },
    configuration: {
      path: '/configuration'
    },
    scheduler: {
      path: '/scheduler'
    },
    reporting: {
      path: '/reporting'
    }
  }
}
