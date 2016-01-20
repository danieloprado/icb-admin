var userModule = require('./modules/user/module');

module.exports = function() {
  console.log("seed");

  userModule.services.userService.findByEmail("danielopraod@outlook.com")
    .then(function(user) {
      if (user) {
        return;
      }

      console.log("seed: creating user");
      userModule.services.userService.create({
        email: "danielopraod@outlook.com",
        senha: "123"
      }).then(function(err) {
        console.log(err);
        if (err) {
          console.error(err);
          return;
        }

        console.log("seed: user created");
      });
    });
};