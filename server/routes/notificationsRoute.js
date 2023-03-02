const router = require('express').Router();
const controller = require('../controller/notificationsController');
const authorization = require('../middleware/authorization');

router.get('/', authorization, controller.getAllNotifications);
// router.get('/article', authorization, controller);

module.exports = router;
