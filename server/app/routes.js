const router = require('express').Router();
const authRoutes = require("app/auth/routes");
const churchRoutes = require("app/church/routes");

router.use('/auth', authRoutes);
router.use('/church', churchRoutes);

module.exports = router;