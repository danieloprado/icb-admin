const express = require('express');
const actions = require('./actions');

const router = express.Router();

router.post('/login', actions.login);
router.post('/select-church', actions.selectChurch);

module.exports = router;