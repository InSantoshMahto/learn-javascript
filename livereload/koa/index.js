import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import serve from 'koa-static';
import render from 'koa-ejs';
import { join } from 'path';
import livereload from 'koa-liverefresh';

const app = new Koa();
const router = new Router();

// importing views
const INDEX = 'index';
// set port
const PORT = process.env.PORT || 80;

// allow cors request
app.use(cors());

// serve static file as a public
app.use(serve(join(__dirname, '/public')));

// view engine with ejs rendering
render(app, {
  root: join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'ejs',
  delimiter: '%',
  cache: false,
  debug: false,
  async: true,
});

/**
 * @description configure koa-liverefresh
 */
livereload(router, join(__dirname, 'public'), join(__dirname, 'views'));

// root get request handler
router.get('/', async (ctx) => {
  let sse = ``;
  await ctx.render(INDEX, {
    sse,
  });
});

// attached router object with app
app.use(router.routes()).use(router.allowedMethods());

// listen to the server
app.listen(PORT, () => {
  console.log(`server is listening port: ${PORT}`);
});
