// tslint:disable: variable-name
import { Context } from 'koa';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { readFileSync } from 'fs';
import { join } from 'path';

const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require('./dist/server/main');

const _static_reg = /.js|.css|.woff|.eot|.woff2|.ttf|.svg|.png|.jpg|.jpeg|.gif|.ico/i;

// construct the dist/browser folder path here
// where your have all the static files
// for your web application
const BROWSER_DIR = join(process.cwd(), 'dist', 'browser');

const _template = readFileSync(join(BROWSER_DIR, 'index.html'), 'utf8');

// Enable prod mode for Angular
// do check if you are running on production by ENV or etc
// if (ENV === 'production') {
enableProdMode();
// }

export default async (ctx: Context, next: () => void) => {
  // Ignore all static files
  // they will be handled by koa-static middleware
  if (ctx.req.url.match(_static_reg)) {
    return;
  }

  // You can setup routes to disable SSR
  // for admin or account pages
  // which are protected by login

  // For example  to disable SSR for
  // all the routes starts with /admin
  // are not required to be SSR as
  // they are behind the login
  // uncomment the below code
  // if(ctx.req.url.startsWith('/admin')){
  //   return ctx.body = _template;
  // }

  // proceeding with SSR for other routes
  try {
    const _html = await renderModuleFactory(AppServerModuleNgFactory, {
      document: _template,
      url: ctx.req.url,
      extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP)
      ]
    });
    ctx.body = _html;
  } catch (error) {
    console.log(error);
  }
};
