const express = require('express');
const request = require('request');
const uuidv4 = require('uuid/v4');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const axios = require('axios');
const querystring = require('querystring');

const PORT = process.env.PORT || 8500;
const csrf_guid = uuidv4();
const account_kit_api_version = 'v1.1';
const app_id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const app_secret = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const me_endpoint_base_url = `https://graph.accountkit.com/${account_kit_api_version}/me`;
const token_exchange_base_url = `https://graph.accountkit.com/${account_kit_api_version}/access_token`;

const app = express();

app.use(cors()); // enables cors
app.use(express.json()); // json MIME type
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.all('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: 'Account Kit API',
  });
});

app.get('/with-otp', (req, res) => {
  res.status(200).json({
    appId: app_id,
    csrf: csrf_guid,
    version: account_kit_api_version,
  });
});

app.post('/with-otp', (req, res) => {
  // if (req.body.csrf_nonce === csrf_guid) {
  if (req.body.code) {
    const app_access_token = ['AA', app_id, app_secret].join('|');
    const params = {
      grant_type: 'authorization_code',
      code: req.body.code,
      access_token: app_access_token,
    };

    // exchange tokens
    const token_exchange_url =
      token_exchange_base_url + '?' + querystring.stringify(params);
    request.get({ url: token_exchange_url, json: true }, function(
      err,
      resp,
      resBody
    ) {
      let view = {
        user_access_token: resBody.access_token,
        expires_at: resBody.token_refresh_interval_sec,
        user_id: resBody.id,
      };

      // get account details at /me endpoint
      const me_endpoint_url =
        me_endpoint_base_url + '?access_token=' + resBody.access_token;
      request.get({ url: me_endpoint_url, json: true }, function(
        err,
        resp,
        resBody
      ) {
        // send login_success.html
        if (resBody.phone) {
          view.method = 'SMS';
          view.identity = resBody.phone.number;
        } else if (resBody.email) {
          view.method = 'Email';
          view.identity = resBody.email.address;
        }
        console.log(`\nconsole logs: view\n\t`, view);
        res.send(view);
      });
    });
  } else {
    res.status(500).json({
      success: false,
      error: { code: 500, message: 'internal server error' },
    });
  }
});

app.listen(PORT, () => {
  console.info(`Server is Listening on ${PORT}`);
});
