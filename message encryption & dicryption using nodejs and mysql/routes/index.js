/** @format */

const express = require('express');

const _ = express.Router();

_.get('/', async (req, res) => {
	db.query('SELECT 1', async (errors, results, fields) => {
		console.log(errors, results, fields);
  });
  
	res.send({});
});

_.all('/*', async (req, res, next)=>{
  return next({status: 404, message: 'route not found, please check and try again'})
})


module.exports = _;
