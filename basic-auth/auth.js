const auth = require("basic-auth");

const basicAuthCredentials = {
  username: "your username",
  password: "your password",
};

module.exports = function (request, response, next) {
  const user = auth(request);
  if (
    !user ||
    !basicAuthCredentials.username ||
    basicAuthCredentials.password !== user.pass
  ) {
    response.set("WWW-Authenticate", 'Basic realm="example"');
    return response.status(401).end();
  }
  return next();
};
