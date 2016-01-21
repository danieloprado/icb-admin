var jwt = require('jsonwebtoken');

var userModule = require('../../modules/user/module');
var auth = require('../../config').auth;

function login(req, res, next) {
  res.header('Access-Control-Expose-Headers', 'X-Token');

  userModule.services.userService.findByEmail(req.body.email)
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