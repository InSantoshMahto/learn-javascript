const sendevent = require('sendevent');
const watch = require('watch');
const uglify = require('uglify-js');
const fs = require('fs');
const path = require('path');
const ENV = process.env.NODE_ENV || 'development';

// create && minify static JS code to be included in the page
let polyfill = fs.readFileSync(
  path.join(__dirname, '../assets/eventsource-polyfill.js'),
  'utf8'
);

let clientScript = fs.readFileSync(
  path.join(__dirname, '../assets/client-script.js'),
  'utf8'
);

let codes = {
  "polyfill.js": polyfill,
  "clientScript.js": clientScript
};

let script = uglify.minify(codes).code;
// console.log(`console logs: script`, script);

function reloadify(app, dir) {
  if (ENV !== 'development') {
    app.locals.watchScript = '';
    return;
  }

  // create a middleware that handles requests to `/eventstream`
  const events = sendevent('/eventstream');

  app.use(events);

  watch.watchTree(dir, function(f, curr, prev) {
    events.broadcast({ msg: 'reload' });
  });

  // assign the script to a local const so it's accessible in the view
  app.locals.watchScript = '<script>' + script + '</script>';
}

module.exports = reloadify;
