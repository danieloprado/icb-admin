const _ = require("lodash");

const userService = require("user/services/userService");
const churchService = require("church/services/churchService");
const tokenService = require("./services/tokenService");

function sendToken(res, token) {
  res.setHeader("X-Token", token);
  return res.send({
    token: token
  });
}

function login(req, res, next) {
  userService.findByEmail(req.body.email)
    .then(user => {
      if (!user) {
        throw {
          status: 400,
          message: "O email ou a senha são inválidos"
        };
      }

      return user.verifyPassword(req.body.password)
        .then(() => user)
        .catch(() => {
          throw {
            status: 400,
            message: "O email ou a senha são inválidos"
          };
        });
    })
    .then((user) => {
      return churchService.listByUser(user).then((churches) => ({
        user,
        churches
      }));
    })
    .then((info) => {
      const church = _.head(info.churches);
      return tokenService.generate(info.user, church);
    })
    .then((token) => {
      sendToken(res, token);
    })
    .catch(next);
}

function selectChurch(req, res, next) {
  if (!req.body.churchId) {
    throw {
      status: 400,
      message: "A igreja é obrigatória"
    };
  }

  churchService.findOne({
      _id: req.body.churchId
    })
    .then((church) => {
      if (!church) {
        throw {
          status: 400,
          message: "Igreja não encontrada"
        };
      }

      return tokenService.generate(req.user, church);
    })
    .then((token) => {
      sendToken(res, token);
    })
    .catch(next);
}

module.exports = {
  login: login,
  selectChurch: selectChurch
};