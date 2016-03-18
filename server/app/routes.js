const router = require('express').Router();
const authRoutes = require("app/auth/routes");
const churchRoutes = require("app/church/routes");
const eventRoutes = require("app/event/routes");
const informativeRoutes = require("app/informative/routes");

router.use('/auth', authRoutes);
router.use('/church', churchRoutes);
router.use('/event', eventRoutes);
router.use('/informative', informativeRoutes);

module.exports = router;