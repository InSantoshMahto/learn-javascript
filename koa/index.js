'use strict';

const Koa = require('koa');
const http = require('http');
const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const app = new Koa();

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

// response 
app.use(async ctx => {
    ctx.body = 'Hello World';
});

httpServer.listen(HTTP_PORT, () => {
    console.log(`HTTP server is listening on PORT ${HTTP_PORT}`);
});
http2Server.listen(HTTP2_PORT, () => {
    console.log(`HTTP2 server is listening on PORT ${HTTP2_PORT}`);
});
