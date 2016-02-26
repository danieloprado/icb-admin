const express = require('express');

const actions = require('./actions');
const checkLogin = require("auth/middlewares/checkLogin");

const router = express.Router();

router.get('/', actions.list);
router.get('/current', checkLogin(), actions.current);
router.get('/:id', actions.get);

router.post('/current', checkLogin(["admin"]), actions.save);


module.exports = router;