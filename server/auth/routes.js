const express = require('express');
const actions = require('./actions');
const checkLogin = require("auth/middlewares/checkLogin");

const router = express.Router();

router.post('/login', actions.login);

router.use(checkLogin());
router.post('/select-church', actions.selectChurch);

module.exports = router;