const express = require('express');

const actions = require('./actions');
const checkLogin = require("auth/middlewares/checkLogin");

const router = express.Router();

router.get('/', checkLogin(), actions.list);
router.post('/', checkLogin(['admin']), actions.save);
router.post('/remove', checkLogin(['admin']), actions.remove);


module.exports = router;