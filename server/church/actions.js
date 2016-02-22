const service = require('./services/churchService');

function list(req, res, next) {
  service.listByUser(req.user)
    .then(churches => {
      return res.json(churches);
    })
    .catch(next);
}

function current(req, res, next) {
  service.findOne({
      _id: req.user.church._id
    })
    .then(church => {
      return res.json(church);
    })
    .catch(next);
}


module.exports = {
  list: list,
  current: current
};