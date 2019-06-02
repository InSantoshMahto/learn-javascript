'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const HTTP_PORT = process.env.PORT || 80;
const HTTPS_PORT = process.env.PORT || 443;

const options = {
    key: fs.readFileSync(path.join(__dirname, 'localhost-privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'localhost-cert.pem'))
};

// const server = https.createServer(options, (req, res) => {
//     console.log(`url: ${req.url}`);
//     console.log(`protocol: HTTP${req.httpVersionMajor}`);
//     console.log(`host: ${req.headers.host}`);
//     console.log(`method: ${req.method}`);
//     console.log(`headers: ${JSON.stringify(req.headers)}`);
//     res.setHeader('content-type', 'text/html');
//     res.write('<h1>Hello World</h1>');
//     res.end();
// });

const server = https.createServer(options,app);

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

server.listen(HTTPS_PORT, (err) => {
    if (err) throw err;
    console.log(`server is runing on port ${HTTPS_PORT}`);
});