const Koa = require('koa');
const cors = require('@koa/cors');

const app = (module.exports = new Koa());

let str = 'ok';

const sse = require('./sse');
const evt = require('./evt');

app.use(cors());

app.use(async function(ctx) {
  // otherwise node will automatically close this connection in 2 minutes
  ctx.req.setTimeout(Number.MAX_VALUE);

  ctx.type = 'text/event-stream; charset=utf-8';
  ctx.set('Cache-Control', 'no-cache');
  ctx.set('Connection', 'keep-alive');

  const body = (ctx.body = sse());
  const stream = evt.subscribe('reload');
  stream.pipe(body);

  // if the connection closes or errors,
  // we stop the SSE.
  const socket = ctx.socket;
  socket.on('error', close);
  socket.on('close', close);

  function close() {
    stream.unpipe(body);
    socket.removeListener('error', close);
    socket.removeListener('close', close);
  }
});

if (!module.parent)
  app.listen(80, () => {
    console.log('server is listening port: 80');
  });
