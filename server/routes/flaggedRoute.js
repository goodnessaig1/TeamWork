const router = require('express').Router();
const controller = require('../controller/flaggedController');

router.patch('/:articleId',   controller.flagArticles);

module.exports = router;
