import 'zone.js/dist/zone-node';

import * as express from 'express';
import { join } from 'path';
import * as isMobileJs from "ismobilejs";

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER_MOBILE = join(process.cwd(), 'mobile/dist/browser');
const DIST_FOLDER_DESKTOP = join(process.cwd(), 'desktop/dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
// const { AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap } = require('./mobile/dist/server/main');
const mobile = require('./mobile/dist/server/main');
const desktop = require('./desktop/dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
// app.engine('html', mobile.ngExpressEngine({
//   bootstrap: mobile.AppServerModuleNgFactory,
//   providers: [
//     mobile.provideModuleMap(mobile.LAZY_MODULE_MAP)
//   ]
// }));

// app.set('view engine', 'html');
// app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER_MOBILE, {
  maxAge: '1m'
}));

// All regular routes use the Universal engine
app.get('*', async (req: express.Request, res: express.Response) => {
  const userAgent = req.headers["user-agent"];
  const isMobile = isMobileJs.default(userAgent).phone;
  if (isMobile) {
    await req.app.engine('html', mobile.ngExpressEngine({
      bootstrap: mobile.AppServerModuleNgFactory,
      providers: [
        mobile.provideModuleMap(mobile.LAZY_MODULE_MAP)
      ]
    }));

    await req.app.set('view engine', 'html');

    return res.render(`${DIST_FOLDER_MOBILE}/index`, { req });
  } else {
    await req.app.engine('html', desktop.ngExpressEngine({
      bootstrap: desktop.AppServerModuleNgFactory,
      providers: [
        desktop.provideModuleMap(desktop.LAZY_MODULE_MAP)
      ]
    }));

    await req.app.set('view engine', 'html');

    return res.render(`${DIST_FOLDER_DESKTOP}/index`, { req });
  }
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
