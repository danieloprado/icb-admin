var auth = require('../../config').auth;
var jwt = require('jsonwebtoken');

module.exports = {

    autoRenewToken: function (req, res, next) {
      var token = req.get('Authorization');

      if (!token) {
        return next();
      }

      token = token.split(' ')[1];

      var now = Math.floor(Date.now() / 1000);

      jwt.verify(token, auth.secret, function(err, decoded) {

        if (err) {
          next();
        }

        var diff = decoded.exp - now;

        if (diff <= (auth.timeout * 0.6)) {
          decoded.exp = now + auth.timeout;
          token = jwt.sign(decoded, auth.secret);

          res.header('Access-Control-Expose-Headers', 'X-Token');
          res.setHeader("X-Token", token);
        }

        next();
      });
    }
};
