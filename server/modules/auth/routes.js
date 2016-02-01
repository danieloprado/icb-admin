const express = require('express');
const actions = require('./actions');

const router = express.Router();

router.post('/login', actions.login);

module.exports = router;