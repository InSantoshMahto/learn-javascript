'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const sse = require('koa-event-stream');
const serve = require('koa-static');
const render = require('koa-ejs');
const http = require('http');
const path = require('path');

let reloadify = require('./lib/koa-reloadify');

const HTTP_PORT = process.env.PORT || 85;

const app = new Koa();
const router = new Router();

const httpServer = http.createServer(app.callback());

// serve static contents
app.use(serve(path.join(__dirname, 'public')));

// view engine with ejs rendering
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'ejs',
  delimiter: '%',
  cache: false,
  debug: false,
  async: true,
});

router.get('/', async (ctx) => {
  await ctx.render('home', {
    watchScript: ctx.watchScript,
  });
});

// routes
app.use(router.routes()).use(router.allowedMethods());

reloadify(app, __dirname + '/views');
app.use(sse());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// listen to http server using node js core api
httpServer.listen(HTTP_PORT, (err) => {
  if (err) throw err;
  console.log(`HTTP server is listening on PORT ${HTTP_PORT}`);
});
