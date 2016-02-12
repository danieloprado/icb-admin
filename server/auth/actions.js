const jwt = require('jsonwebtoken');
const userService = require("user/services/userService");

var auth = require('config').auth;

const sendToken = (res, user, churchId) => {
  res.header('Access-Control-Expose-Headers', 'X-Token');

  console.log(user, churchId);

  if (churchId) {

  }

  const token = jwt.sign({
    email: user.email,
    name: user.name,
    id: user._id,
    exp: Math.floor(Date.now() / 1000) + auth.timeout
  }, auth.secret);

  res.setHeader("X-Token", token);
  return res.send({
    token: token
  });
};

function login(req, res, next) {

  userService.findByEmail(req.body.email).then(user => {
    if (!user) {
      return res.status(400).send({
        message: "O email ou a senha são inválidos"
      });
    }

    user.verifyPassword(req.body.password).then(() => {
      sendToken(user);
    }).catch(() => {
      return res.status(400).send({
        message: "O email ou a senha são inválidos"
      });
    });

  }).catch(next);
}

function selectChurch(req, res, next) {
  if (!req.user) {
    return res.status(401).send({
      error: "Senta lá Cláudia!"
    });
  }


}

module.exports = {
  login: login,
  selectChurch: selectChurch
};