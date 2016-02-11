var userService = require('modules/user/services/userService');
var churchService = require('modules/church/services/churchService');

const createChurch = () => {
  churchService.findBySlug("icb-sorocaba")
    .then((church) => {
      if (church) {
        return church;
      }

      return churchService.create({
        name: "ICB Sorocaba"
      });
    })
    .catch((err) => {
      console.log('seed: church error', JSON.stringify(err, null, 2));
    });
};

const createUser = () => {
  userService.findByEmail("danieloprado@outlook.com")
    .then((user) => {
      if (user) {
        return user;
      }

      return userService.create({
          name: {
            firstName: "Daniel",
            lastName: "Prado"
          },
          email: "danieloprado@outlook.com",
          password: "123"
        }, "icb-sorocaba", ["admin"])
        .catch(function(err) {
          console.log('seed: user error', JSON.stringify(err, null, 2));
        });
    });
};

module.exports = function() {
  console.log("seed begin");

  createChurch()
    .then(createUser)
    .then(() => {
      console.log("seed completed");
    });


};