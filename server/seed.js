var userService = require('user/services/userService');
var churchService = require('church/services/churchService');

const createChurch = () => {
  console.log("seed: begin create church");

  return churchService.findOne()
    .then((church) => {
      if (church) {
        return church;
      }

      console.log("seed: create church");
      return churchService.create({
        name: "ICB Sorocaba",
        location: {
          address: "R. Cesário Mota, 217 - Centro, Sorocaba - SP, 18035-200",
          lat: -23.5027917,
          lng: -47.461769900000036
        }
      });
    });
};

const createUser = (church) => {
  console.log("seed: begin create user on", church.name);

  return userService.findByEmail("danieloprado@outlook.com")
    .then((user) => {
      if (user) {
        return user;
      }

      console.log("seed: create user");
      return userService.create({
        name: {
          firstName: "Daniel",
          lastName: "Prado"
        },
        email: "danieloprado@outlook.com",
        password: "123"
      }, church._id, ["admin"]);
    });
};

module.exports = function() {
  console.log("seed: begin");

  createChurch()
    .then(createUser)
    .then(() => {
      console.log("seed: completed");
    })
    .catch(err => {
      console.log('seed: error', err);
    });
};