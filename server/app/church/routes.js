const router = require('express').Router();
const actions = require('./actions');

const checkLogin = require('app/auth/middlewares/checkLogin');

router.get('/', actions.list);
router.get('/current', checkLogin(), actions.current);

module.exports = router;