const express = require('express');

const actions = require('./actions');
const checkLogin = require("auth/middlewares/checkLogin");

const router = express.Router();

router.get('/', checkLogin(), actions.list);
// router.get('/current', checkLogin(), actions.current);
//
// router.post('/current', checkLogin(["admin"]), actions.save);
//

module.exports = router;