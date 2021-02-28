const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.disable('E-Tag');
app.disable('X-Powered-By');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/video', (req, res) => {
  //  const readStream = fs.createReadStream(
  //     path.join(__dirname, 'resources', 'video.mp4')
  //   );
  //   readStream.pipe(res);
  const path = 'resources/video.mp4';
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

app.listen(3001, () => {
  console.log(`server running on port: 3001`);
});
