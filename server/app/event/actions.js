const service = require('./services/eventService');

function list(req, res, next) {
  service.list(req.user.church_id)
    .then(events => {
      return res.json(events);
    })
    .catch(next);
}

function next(req, res, next) {
  service.next(req.user.church_id)
    .then(event => {
      return res.json(event);
    })
    .catch(next);
}

module.exports = {
  list,
  next
};