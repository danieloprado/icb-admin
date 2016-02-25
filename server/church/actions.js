const service = require('./services/churchService');
const tokenService = require("auth/services/tokenService");

function list(req, res, next) {
  service.list()
    .then(churches => {
      return res.json(churches);
    })
    .catch(next);
}

function get(req, res, next) {
  service.findOne({
      _id: req.params.id
    })
    .then(church => {
      return res.json(church);
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

function save(req, res, next) {
  const church = req.body;

  if (church._id != req.user.church._id) {
    throw {
      status: 403
    };
  }

  service.update(church)
    .then(church => tokenService.updateChurch(req.user, church))
    .then(token => {
      res.setHeader("X-Token", token);
      res.json();
    })
    .catch(next);
}


module.exports = {
  list: list,
  get: get,
  current: current,
  save: save
};