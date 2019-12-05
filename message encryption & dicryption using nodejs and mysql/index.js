/** @format */

const app = require('./app');

app.InitMySqlDb().then(async (res) => {
  console.info('[DB]: ',res)
	app.Bootstrap();
}).catch(async err =>{
  console.error('[DB]: ', err);
});
