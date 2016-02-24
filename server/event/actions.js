const service = require('./services/eventService');

function list(req, res, next) {
  service.list({
      church: req.user.church._id
    })
    .then(informatives => res.send(informatives))
    .catch(next);
}

module.exports = {
  list: list
};