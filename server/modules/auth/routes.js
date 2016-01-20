var express = require('express');
var actions = require('./actions');

var router  = express.Router();

router.post('/login', actions.login);

module.exports = router;
