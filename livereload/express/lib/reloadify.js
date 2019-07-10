import sendevent from 'sendevent';
import { watchTree } from 'watch';
import { minify } from 'uglify-es';
import { readFileSync } from 'fs';
import { join } from 'path';
const ENV = process.env.NODE_ENV || 'development';

// create && minify static JS code to be included in the page
let polyfill = readFileSync(
  join(__dirname, '../public/js/eventsource-polyfill.js'),
  'utf8'
);

let clientScript = readFileSync(
  join(__dirname, '../public/js/client-script.js'),
  'utf8'
);

let codes = {
  'polyfill.js': polyfill,
  'clientScript.js': clientScript,
};

let script = minify(codes).code;
// console.log(`console logs: script`, script);

function reloadify(app, dir) {
  if (ENV !== 'development') {
    app.locals.watchScript = '';
    return;
  }

  // create a middleware that handles requests to `/eventstream`
  const events = sendevent('/eventstream');

  app.use(events);

  watchTree(dir, function(f, curr, prev) {
    events.broadcast({ msg: 'reload' });
  });

  // assign the script to a local const so it's accessible in the view
  app.locals.watchScript = '<script>' + script + '</script>';
}

export default reloadify;
