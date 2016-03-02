const _ = require('lodash');

const tokenService = require("admin/auth/services/tokenService");
const UserToken = require("models/userToken");
const auth = require('config').auth;

function autoRenewToken(req, res, next) {
  if (!req.user) return next();

  const now = Math.floor(Date.now() / 1000);
  const diff = req.user.exp - now;

  if (diff > (auth.timeout * 0.6)) return next();

  tokenService.renew(req.user)
    .then(token => {
      res.setHeader("X-Token", token);
    })
    .catch(next);
}

module.exports = autoRenewToken;