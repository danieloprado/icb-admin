const service = require('./services/informativeService');

function last(req, res, next) {
  service.last()
    .then(churches => {
      return res.json(churches);
    })
    .catch(next);
}

module.exports = {
  last
};