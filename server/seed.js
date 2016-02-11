var userService = require('user/services/userService');
var churchService = require('church/services/churchService');

const createChurch = () => {
  return churchService.findBySlug("icb-sorocaba")
    .then((church) => {
      console.log("church", church);

      if (church) {
        return church;
      }

      return churchService.create({
        name: "ICB Sorocaba"
      });
    });
};

const createUser = () => {
  console.log("create user");

  return userService.findByEmail("danieloprado@outlook.com")
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
      }, "icb-sorocaba", ["admin"]);
    });
};

module.exports = function() {
  console.log("seed begin");

  createChurch()
    .then(createUser)
    .then(() => {
      console.log("seed completed");
    })
    .catch(err => {
      console.log('seed: error', JSON.stringify(err, null, 2));
    });


};