const messageController = require('./message.controller');

module.exports = {
	midlewares: require('./midlewares'),
  utils: require('./utils'),
  getMessage: messageController.getMessage,
  getMessageSearch: messageController.getMessageBySerarch,
  postMessage: messageController.postMessage
};