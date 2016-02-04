const service = require('./services/informativeService');

function list(req, res, next) {
  service.list(req.query)
    .then(informatives => res.send(informatives))
    .catch(next);
}

function get(req, res, next) {
  service.findOne({
      _id: req.params.id
    })
    .then(informative => {
      if (!informative) {
        res.status(404).json("Informative not found");
        return;
      }

      res.send(informative);
    })
    .catch(next);
}

function save(req, res, next) {
  service.create(req.body)
    .then(informative => {
      res.status(201).send(informative);
    })
    .catch(next);
}

module.exports = {
  list: list,
  get: get,
  save: save
};