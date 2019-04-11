const authentication = require('@feathersjs/authentication')
const jwt = require('@feathersjs/authentication-jwt')
const local = require('@feathersjs/authentication-local')

module.exports = function (app) {
  const config = app.get('authentication')

  // Set up authentication with the secret
  app.configure(authentication(config))
  app.configure(jwt())
  app.configure(local())

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        context => {
          // If this is set to false
          context.params.authenticated = false
        },
        authentication.hooks.authenticate(config.strategies),
        context => {
          // and this is set to true
          // when then this value = https://github.com/feathersjs/feathers/blob/buzzard/packages/authentication/lib/socket/handler.js#L95
          // is set to false from the above hook
          context.params.authenticated = true
        }
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  })
}
