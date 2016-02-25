const express = require('express');

const actions = require('./actions');
const checkLogin = require("auth/middlewares/checkLogin");

const router = express.Router();

router.get('/', actions.list);
router.get('/:id', actions.get);
router.get('/current', checkLogin(), actions.current);

router.post('/current', checkLogin(["admin"]), actions.save);


module.exports = router;