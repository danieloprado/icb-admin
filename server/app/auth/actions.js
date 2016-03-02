const _ = require("lodash");

const churchService = require('app/church/services/churchService');
const tokenService = require('./services/tokenService');

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
    return res.json({
      token: token
    });
  }).catch(next);
}

module.exports = {
  loginChurch
};