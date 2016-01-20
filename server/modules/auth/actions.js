var jwt = require('jsonwebtoken');

var userService  = require('../../modules/user/services/userService');
var auth       = require('../../config').auth;

var actions = {
  login: function(req, res, next) {
    res.header('Access-Control-Expose-Headers', 'X-Token');

    var user = userService.findByEmail(req.body.email)

    .then(function(user) {
      if (!user) {
        return res.status(400).send({
          message: "Email não encontrado"
        });
      }

      user.verify(req.body.password, function(err, success) {

        if (err || !success) {
          return res.status(400).send({
            message: "Senha inválida"
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
};

module.exports = actions;
