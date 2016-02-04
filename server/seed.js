var userService = require('modules/user/services/userService');

module.exports = function() {
  console.log("seed");

  userService.findByEmail("danieloprado@outlook.com")
    .then(function(user) {
      if (user) {
        return;
      }

      console.log("seed: creating user");
      userService.create({
        name: {
          firstName: "Daniel",
          lastName: "Prado"
        },
        email: "danieloprado@outlook.com",
        roles: ["admin"],
        password: "123"
      }).then(function() {
        console.log("seed: user created");
      }).catch(function(err) {
        console.log('seed: user error', JSON.stringify(err, null, 2));
      });
    });
};