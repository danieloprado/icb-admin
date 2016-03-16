const router = require('express').Router();
const actions = require('./actions');

const checkLogin = require('app/auth/middlewares/checkLogin');

router.get('/last', checkLogin(), actions.last);

module.exports = router;