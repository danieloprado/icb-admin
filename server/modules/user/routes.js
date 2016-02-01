const express = require('express');

const actions = require('./actions');
const auth = require("../auth/module");

const router = express.Router();

router.use(auth.middlewares.checkLogin());

router.get('/', actions.list);
router.get('/:id', actions.get);
router.post('/', actions.create);

module.exports = router;