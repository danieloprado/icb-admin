const _ = require("lodash");

const churchService = require('app/church/services/churchService');
const tokenService = require('./services/tokenService');

function sendToken(res, token) {
  res.setHeader("X-Token", token);
  return res.send({
    token: token
  });
}

function loginChurch(req, res, next) {
  churchService.findOne({
    _id: req.body.id
  }).then((church) => {
    if (!church) {
      throw {
        status: 404,
        message: "Igreja não encontrada"
      };
    }

    return tokenService.generateAnonymous(church);
  }).then((token) => {
    sendToken(res, token);
  }).catch(next);
}

module.exports = {
  loginChurch
};