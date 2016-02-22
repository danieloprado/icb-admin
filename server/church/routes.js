const express = require('express');

const actions = require('./actions');
const checkLogin = require("auth/middlewares/checkLogin");

const router = express.Router();

router.use(checkLogin());

router.get('/', actions.list);
router.get('/current', actions.current);

module.exports = router;