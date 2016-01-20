var userService  = require('./services/userService');

var actions = {
  list: function(req, res, next) {
    userService.list(req.query).then(function(users) {
        return users.map(function(user) {
            return {
                _id: user._id,
                email: user.email
            };
        });
    }, function(err, str) {
        next(err);
    }).then(function(users) {
        res.send(users);
    });
  },
  get: function(req, res, next) {
    userService.findOne({_id: req.params.id}).then(function(user) {
      if (!user) {
        res.status(404).json("User not found");
        return;
      }
      res.send(user);
    }, function(err) {
      next(err);
    });
  },
  create: function(req, res, next) {
    userService.create(req.body).then(function (err) {
      if (err) return next(err);
      res.status(201).send(user);
    });
  }
};

module.exports = actions;
