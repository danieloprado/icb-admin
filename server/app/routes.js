const router = require('express').Router();
const churchRoutes = require("app/church/routes");

router.use('/church', churchRoutes);

module.exports = router;