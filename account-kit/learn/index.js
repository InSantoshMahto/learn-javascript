const fs = require('fs');
const Guid = require('guid');
const express = require('express');
const bodyParser = require('body-parser');
const Mustache = require('mustache');
const Request = require('request');
const Querystring = require('querystring');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
let csrf_guid = Guid.raw();
// We are using Account Kit which is version 1.0
// Facebook Graph API is version 2.6 and will be displayed in your
// Facebook app dashboard, but setting 2.6 for the api_version will not work here
const account_kit_api_version = 'v1.1';
const app_id = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const app_secret = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const me_endpoint_base_url =
  'https://graph.accountkit.com/' + account_kit_api_version + '/me';
const token_exchange_base_url =
  'https://graph.accountkit.com/' + account_kit_api_version + '/access_token';

function loadLogin() {
  return fs.readFileSync('dist/login.html').toString();
}

app.get('/', function(request, response) {
  let view = {
    appId: app_id,
    csrf: csrf_guid,
    version: account_kit_api_version,
  };

  let html = Mustache.to_html(loadLogin(), view);
  response.send(html);
});

function loadLoginSuccess() {
  return fs.readFileSync('dist/login_success.html').toString();
}

function loadError() {
  return fs.readFileSync('dist/error.html').toString();
}

// for mobile
app.post('/sendcode', function(request, response) {
  // CSRF check
  if (request.body.csrf_nonce === csrf_guid) {
    let app_access_token = ['AA', app_id, app_secret].join('|');
    let params = {
      grant_type: 'authorization_code',
      code: request.body.code,
      access_token: app_access_token,
    };

    // exchange tokens
    let token_exchange_url =
      token_exchange_base_url + '?' + Querystring.stringify(params);
    Request.get({ url: token_exchange_url, json: true }, function(
      err,
      resp,
      respBody
    ) {
      // console.log(`\nexchange tokens:: console logs: respBody`, respBody);
      let view = {
        user_access_token: respBody.access_token,
        expires_at: respBody.token_refresh_interval_sec,
        user_id: respBody.id,
      };
      // console.log(`\nconsole logs: view\n\t`, view);

      // get account details at /me endpoint
      let me_endpoint_url =
        me_endpoint_base_url + '?access_token=' + respBody.access_token;
      Request.get({ url: me_endpoint_url, json: true }, function(
        err,
        resp,
        respBody
      ) {
        // console.log(`\nget account details:: console logs: respBody`, respBody);

        // send login_success.html
        if (respBody.phone) {
          view.method = 'SMS';
          view.identity = respBody.phone.number;
        } else if (respBody.email) {
          view.method = 'Email';
          view.identity = respBody.email.address;
        }
        console.log(`\nconsole logs: view\n\t`, view);
        let html = Mustache.to_html(loadLoginSuccess(), view);
        response.send(html);
      });
    });
  } else {
    let html = Mustache.to_html(loadError());
    response.send(html);
  }
});

app.get('/sendcode', function(request, response) {
  let html = Mustache.to_html(loadError());
  response.send(html);
});

function loadEmailRedirect() {
  return fs.readFileSync('dist/email_redirect.html').toString();
}

// for email
app.get('/accepts', function(request, response) {
  const view = request.query;
  let html = Mustache.to_html(loadEmailRedirect(), view);
  response.send(html);
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
