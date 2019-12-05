/** @format */
const path = require('path');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const logger = require('express-pino-logger');
const helmet = require('helmet');

const config = require('./config');
const routes = require('./routes');
const midlewares = require('./controllers').midlewares;

const PORT = process.env.PORT || 8585;

/**
 * express app.
 */
exports.Bootstrap = async () => {
	const app = express();

	// config
	app.set('port', PORT);
	app.disable('etag');
	app.disable('x-powered-by');
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());

	// init midlewares
	app.use(cors());
	app.use(helmet());
	app.use(logger());

	// routes
	app.use(routes);

	// errors handeler middleware
  app.use(midlewares.errorhandler);
  
	// initialte
	app.listen(PORT, () => {
		console.info(`Server is Listening on PORT: ${PORT}`);
	});
};

/**
 * mysql connection
 */
exports.InitMySqlDb = async () => {
	return new Promise((resolve, reject) => {
		const db = mysql.createConnection(config.db);
		db.connect(async (err) => {
			if (err) {
				return reject({
					success: false,
					message: `error ouccred: During Establishing The Connection. ${err}`,
				});
			}
			global.db = db;
			return resolve({ success: true, message: 'Connection Established.' });
		});
	});
};
