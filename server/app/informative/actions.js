const service = require('./services/informativeService');

function list(req, res, next) {
  service.list(req.user.church_id)
    .then(informatives => {
      return res.json(informatives);
    })
    .catch(next);
}

function last(req, res, next) {
  service.last(req.user.church_id)
    .then(informative => {
      return res.json(informative);
    })
    .catch(next);
}

module.exports = {
  list,
  last
};