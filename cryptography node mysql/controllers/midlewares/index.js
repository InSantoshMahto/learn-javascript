const appMidlewares = require('./app.midleware');
module.exports = {
  errorhandler: appMidlewares.errorhandler,
  authenticator: appMidlewares.authenticator
}