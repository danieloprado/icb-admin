const tokenService = require("./../services/tokenService");
const auth = require('config').auth;

function autoRenewToken(req, res, next) {
  const token = req.get('Authorization');

  if (!token) {
    return next();
  }

  tokenService.verify(token.split(' ')[1])
    .then((decoded) => {
      req.user = decoded;

      var now = Math.floor(Date.now() / 1000);
      var diff = decoded.exp - now;

      if (diff > (auth.timeout * 0.6)) {
        return;
      }

      return tokenService.renew(decoded).then(token => {
        res.setHeader("X-Token", token);
      });
    })
    .then(next)
    .catch(next);
}

module.exports = autoRenewToken;