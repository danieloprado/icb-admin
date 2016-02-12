const jwt = require('jsonwebtoken');
const userService = require("user/services/userService");

var auth = require('config').auth;

const sendToken = (res, user, churchId) => {
  res.header('Access-Control-Expose-Headers', 'X-Token');

  const tokenData = {
    email: user.email,
    name: user.name,
    id: user._id,
    exp: Math.floor(Date.now() / 1000) + auth.timeout
  };

  const send = () => {
    const token = jwt.sign(tokenData, auth.secret);

    res.setHeader("X-Token", token);
    return res.send({token: token});
  };

  if (churchId) {
    user.getRoles(churchId).then((roles) => {
      tokenData.churchId = churchId;
      tokenData.roles = roles;

      send();
    });
    return;
  }

  send();
};

function login(req, res, next) {

  userService.findByEmail(req.body.email).then(user => {
    if (!user) {
      return res.status(400).send({message: "O email ou a senha são inválidos"});
    }

    user.verifyPassword(req.body.password).then(() => {
      sendToken(res, user);
    }).catch((err) => {
      return res.status(400).send({message: "O email ou a senha são inválidos"});
    });

  }).catch(next);
}

function selectChurch(req, res, next) {
  if (!req.user) {
    return res.status(401).send({error: "Senta lá Cláudia!"});
  }

}

module.exports = {
  login: login,
  selectChurch: selectChurch
};
