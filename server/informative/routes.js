const express = require('express');

const actions = require('./actions');
const checkLogin = require("auth/middlewares/checkLogin");

const router = express.Router();

router.get('/', actions.list);
router.get('/:id', actions.get);

router.use(checkLogin(["admin"]));
router.post('/', actions.save);
router.post('/remove', actions.remove);

module.exports = router;