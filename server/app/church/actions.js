const service = require('./services/churchService');

function list(req, res, next) {
  service.list()
    .then(churches => {
      return res.json(churches);
    })
    .catch(next);
}

module.exports = {
  list
};