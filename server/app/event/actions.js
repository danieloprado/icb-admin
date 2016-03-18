const service = require('./services/eventService');


function next(req, res, next) {
  service.next(req.user.church_id)
    .then(event => {
      return res.json(event);
    })
    .catch(next);
}

module.exports = {
  next
};