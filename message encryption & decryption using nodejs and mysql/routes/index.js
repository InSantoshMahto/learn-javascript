/** @format */

const express = require('express');

const controllers = require('../controllers');
const authenticator = controllers.midlewares.authenticator;

const _ = express.Router();

_.get('/', async (req, res) => {
	// db.query('SELECT 1', async (errors, results, fields) => {
	// 	if (errors) {
	// 		return next({ status: 500, message: errors });
	// 	}
	// 	console.log(results);
	// });

	res.send({ sucess: true, message: 'Api Working.' });
});

// get message
_.get('/message', controllers.getMessage);

// post message
_.post('/message', controllers.postMessage);

// get message
_.get('/message/search', controllers.getMessageSearch);

// 404
_.all('/*', async (req, res, next) => {
	return next({
		status: 404,
		message: 'route not found, please check and try again',
	});
});

module.exports = _;
