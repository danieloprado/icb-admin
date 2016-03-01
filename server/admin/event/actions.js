const service = require('./services/eventService');

function list(req, res, next) {
  service.list({
      church: req.user.church._id
    })
    .then(informatives => res.send(informatives))
    .catch(next);
}

function save(req, res, next) {
  var promise;
  const event = req.body;

  if (!req.body._id) {
    promise = service.create(event, req.user);
  } else {
    promise = service.update(event);
  }

  promise.then(event => {
    res.status(201).send(event);
  }).catch(next);
}

function remove(req, res, next) {
  service.remove({
      _id: req.body.id
    })
    .then(() => {
      res.status(200).send();
    })
    .catch(next);
}

module.exports = {
  list: list,
  save: save,
  remove: remove
};