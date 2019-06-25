'use strict';
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');

const PORT = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, 'assets')));

let reloadify = require('./lib/reloadify');
reloadify(app, __dirname + '/views');

// view engine setup
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  next();
});

// serve an empty page that just loads the browserify bundle
app.get('/', function(req, res) {
  res.render('home');
});

app.listen(PORT);
console.log('server started on port %s', PORT);
