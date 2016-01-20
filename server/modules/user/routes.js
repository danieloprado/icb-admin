var express = require('express');
var actions = require('./actions');

var router = express.Router();

router.get('/', actions.list);
router.get('/:id', actions.get);
router.post('/', actions.create);

module.exports = router;