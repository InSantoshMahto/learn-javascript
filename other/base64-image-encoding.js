'use strict';
const path = require('path');
const fs = require('fs');

let imgPath = fs.readFileSync(
  path.join(__dirname, '../resources/uploads/images', '/welcome.webp')
);

let welcome = Buffer.from(imgPath).toString('base64');
