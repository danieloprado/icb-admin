const router = require('express').Router();
const actions = require('./actions');

router.get('/', actions.list);

module.exports = router;