const router = require('express').Router();

const autoRenewToken = require('admin/auth/middlewares/autoRenewToken');

const authRoutes = require("admin/auth/routes");
const churchRoutes = require("admin/church/routes");
const eventRoutes = require("admin/event/routes");
const informativeRoutes = require("admin/informative/routes");
const userRoutes = require("admin/user/routes");

router.use(autoRenewToken);

router.use('/auth', authRoutes);
router.use('/church', churchRoutes);
router.use('/event', eventRoutes);
router.use('/informative', informativeRoutes);
router.use('/user', userRoutes);

module.exports = router;