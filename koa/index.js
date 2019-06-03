'use strict';

const dotenv = require('dotenv').config();
const Koa = require('koa');
const favicon = require('koa-favicon');
const serve = require('koa-static');
const cors = require('@koa/cors');
const render = require('koa-ejs');
const http = require('http');
const http2 = require('http2');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = require('./routes');

const HTTP_PORT = process.env.PORT || 80;
const HTTP2_PORT = process.env.PORT || 443;

const options = {
    key: fs.readFileSync(path.join(__dirname, 'resources/ssl/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'resources/ssl/cert.pem'))
};

const httpServer = http.createServer(app.callback());
const http2Server = http2.createSecureServer(options, app.callback());

// logger 
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time 
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// for dotenv
if (dotenv.error) throw dotenv.error;
console.log(`key added in env by dotenv are:\n`, dotenv.parsed);

// enable cors
app.use(cors());

// serve favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// serve static contents
app.use(serve(path.join(__dirname, 'public'), { maxAge: 60000 }));

// global config for domain
app.use(async (ctx, next) => {
    await next();
    // to set domain
    app.context.damain = ctx.request.origin;
    console.log(ctx.damain);
});

// view engine with ejs rendering
render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'public-layout',
    viewExt: 'html',
    delimiter: '%',
    cache: false,
    debug: false,
    async: true
});
// routes
app.use(router.routes())
    .use(router.allowedMethods());

// listen to http server
httpServer.listen(HTTP_PORT, err => {
    if (err) throw err;
    console.log(`HTTP server is listening on PORT ${HTTP_PORT}`);
});

// listen to https or http2 server
http2Server.listen(HTTP2_PORT, err => {
    if (err) throw err;
    console.log(`HTTP2 server is listening on PORT ${HTTP2_PORT}`);
});
