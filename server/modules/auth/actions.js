const jwt = require('jsonwebtoken');
const userService = require("modules/user/services/userService");

var auth = require('config').auth;

function login(req, res, next) {
  res.header('Access-Control-Expose-Headers', 'X-Token');

  userService.findByEmail(req.body.email).then(user => {
    if (!user) {
      return res.status(400).send({message: "O email ou a senha são inválidos"});
    }

    user.verifyPassword(req.body.password).then(() => {
      const token = jwt.sign({
        email: user.email,
        id: user._id,
        exp: Math.floor(Date.now() / 1000) + auth.timeout
      }, auth.secret);

      res.setHeader("X-Token", token);
      return res.send({token: token});
    }).catch((err) => {
      return res.status(400).send({message: "O email ou a senha são inválidos"});
    });

  }).catch(next);
}

module.exports = {
  login: login
};
