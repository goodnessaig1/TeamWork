const router = require('express').Router();
const controller = require('../controller/feedsController');
const authorization = require('../middleware/authorization');
// const validation = require('../middleware/validation');

router.get('/', authorization, controller.getAllFeeds);
router.get('/article', authorization, controller.getArticlesFeeds);

module.exports = router;
