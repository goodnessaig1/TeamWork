const router = require('express').Router();
const controller = require('../controller/notificationsController');
const authorization = require('../middleware/authorization');

router.get('/', authorization, controller.getAllNotifications);
router.patch(
  '/articles/:notificationId',
  authorization,
  controller.readArticleNotification
);
router.patch(
  '/gifs/:notificationId',
  authorization,
  controller.readGifNotification
);

module.exports = router;
