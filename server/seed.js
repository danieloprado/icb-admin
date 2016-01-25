var userModule = require('./modules/user/module');

module.exports = function() {
  console.log("seed");

  userModule.services.userService.findByEmail("danieloprado@outlook.com")
    .then(function(user) {
      if (user) {
        return;
      }

      console.log("seed: creating user");
      userModule.services.userService.create({
        name: {
          firstName: "Daniel",
          lastName: "Prado"
        },
        email: "danieloprado@outlook.com",
        password: "123"
      }).then(function() {
        console.log("seed: user created");
      }).catch(function(err) {
        console.log(err);
      });
    });
};