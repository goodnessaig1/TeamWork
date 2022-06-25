const router = require('express').Router();
const controller = require('../controller/articleController');
const authorization = require('../middleware/authorization');
const validation = require("../middleware/validation");


router.post('/', authorization, validation.article, controller.createArticle);

module.exports = router;