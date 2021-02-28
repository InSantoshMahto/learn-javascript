/**
 * @author Santosh Mahto
 * @description index routes. it contain roots routes.
 * @listens MIT
 * @name index
 * @since 2017
 */

'use strict';

const Router = require('koa-router');
const router = new Router();

// preparing routing pages.
const INDEX = 'index';
const ABOUT = 'about';
const PUBLIC = 'public';
const CONTACT = 'contact';
const EROOR404 = '404';
const FALLBACK = 'fallback';

// state
router.use(async (ctx, next) => {
  await next();
  ctx.state = ctx.state || {};
  ctx.state.now = new Date();
  ctx.state.ip = ctx.ip;
  ctx.state.version = '2.0.0';
  ctx.type = 'text/html; charset=utf-8';
});

// get data using middleware
let domain, tagLine;
router.use(async (ctx, next) => {
  await next()
  domain = ctx.domain;
  tagLine = process.env.TAG_LINE;
});


/* ===============================================================
------------------------Root routing------------------------------
=================================================================== */

// Home page
router.get('/', async ctx => {
  await ctx.render(INDEX, {
    domain: domain,
    tagLine: tagLine,
    title: `Teckat | ${tagLine}`,
  });
});

// contact page
router.get('/contact', async ctx => {
  await ctx.render(CONTACT, {
    domain: domain,
    tagLine: tagLine,
    title: `Contact | ${tagLine}`,
  });
});

// about page
router.get('/about', async ctx => {
  await ctx.render(ABOUT, {
    layout: 'auth-layout',
    domain: domain,
    tagLine: tagLine,
    title: `About | ${tagLine}`,
  });
});

// public page
router.get('/public', async ctx => {
  await ctx.render(PUBLIC, {
    layout: 'layouts/public',
    domain: domain,
    tagLine: tagLine,
    title: `About | ${tagLine}`,
  });
});

// fallback page
router.get('/fallback', async ctx => {
  await ctx.render(FALLBACK, {
    domain: domain,
    tagLine: tagLine, 
    title: `Offline | ${tagLine}`,
  });
});

// GET 404 page.
router.get('/*', async ctx => {
  await ctx.render(EROOR404, {
    domain: domain,
    tagLine: tagLine,
    title: `Error | 404 | File Not Found | ${tagLine}`,
  });
});

module.exports = router;
