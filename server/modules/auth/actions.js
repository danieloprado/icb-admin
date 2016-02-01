const jwt = require('jsonwebtoken');
const userService = require("modules/user/services/userService");

var auth = require('config').auth;

function login(req, res) {
  res.header('Access-Control-Expose-Headers', 'X-Token');

  userService.findByEmail(req.body.email)
    .then(function(user) {
      if (!user) {
        return res.status(400).send({
          message: "O email ou a senha são inválidos"
        });
      }

      user.verifyPassword(req.body.password, function(err, success) {
        if (err || !success) {
          return res.status(400).send({
            message: "O email ou a senha são inválidos"
          });
        }

        var token = jwt.sign({
          email: user.email,
          id: user._id,
          exp: Math.floor(Date.now() / 1000) + auth.timeout
        }, auth.secret);

        res.setHeader("X-Token", token);
        res.send({
          token: token
        });
      });
    });
}

module.exports = {
  login: login
};