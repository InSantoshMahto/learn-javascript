'use strict';
const path = require('path');
const fs = require('fs');

let imgPathToSave = path.join(
  __dirname,
  '../resources/uploads/images',
  '/test.png'
);

fs.writeFile(imgPathToSave, welcome, { encoding: 'base64' }, err => {
  if (err) throw console.error(err);
});
