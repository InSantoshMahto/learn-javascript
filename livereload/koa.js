'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const render = require('koa-ejs');
const compress = require('koa-compress');
// const sse = require('sse-broadcast');
const cors = require('@koa/cors');
const http = require('http');
const path = require('path');

// let reloadify = require('./lib/koa-reloadify');

const HTTP_PORT = process.env.PORT || 80;

const app = new Koa();
const router = new Router();

const httpServer = http.createServer(app.callback());

// gzip compression
// app.use(compress());

app.use(cors());

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
  await ctx.render('koa-home');
});

router.get('/events', (ctx) => {
  ctx.res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  ctx.res.write('event: reload\ndata: ' + true + '\n\n');

  let id = setInterval(function() {
    ctx.res.write('data: ' + Date.now() + '\n\n');
  }, 2000);

  ctx.req.on('end', function() {
    clearInterval(id);
    console.log('response ended');
  });
  
  next();
});

// routes
app.use(router.routes()).use(router.allowedMethods());

// reloadify(app, __dirname + '/views');

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// listen to http server using node js core api
httpServer.listen(HTTP_PORT, (err) => {
  if (err) throw err;
  console.log(`HTTP server is listening on PORT ${HTTP_PORT}`);
});

// var http = require('http');

// var server = http.createServer(function(req, res) {
//   if (req.url != '/events') return res.end();
//   res.writeHead(200, {
//     'Content-Type': 'text/event-stream',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers':
//       'Origin, X-Requested-With, Content-Type, Accept',
//   });
//   var id = setInterval(function() {
//     res.write('data: ' + Date.now() + '\n\n');
//   }, 1000);
//   req.on('end', function() {
//     clearInterval(id);
//   });
// });

// server.listen(80);
