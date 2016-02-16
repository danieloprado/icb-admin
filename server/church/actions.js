const service = require('./services/churchService');

function list(req, res, next) {
  service.listByUser(req.user)
    .then(churches => {
      return res.send(churches);
    })
    .catch(next);
}


module.exports = {
  list: list
};