'use strict';

const http = require('http');
const express = require('express');

const app = express();

const HTTP_PORT = process.env.PORT || 80;
// const HTTPS_PORT = process.env.PORT || 443;

// const server = http.createServer((req, res) => {
//     console.log(`url: ${req.url}`);
//     console.log(`host: ${req.headers.host}`);
//     console.log(`method: ${req.method}`);    
//     console.log(`headers: ${JSON.stringify(req.headers)}`);
//     res.setHeader('content-type', 'text/html');
//     res.write('<h1>Hello World</h1>');
//     res.end();
// });

// server.on('clientError', (err, socket) => {
//     socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
// });

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

server.listen(HTTP_PORT, (err) => {
    if (err) throw err;
    console.log(`server is runing on port ${HTTP_PORT}`);
});