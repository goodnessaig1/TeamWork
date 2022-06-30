const router = require('express').Router();
const controller = require('../controller/articleController');
const authorization = require('../middleware/authorization');
const validation = require("../middleware/validation");

// POST AN ARTICLE
router.post('/', authorization, validation.article, controller.createArticle);

// UPDATE ARTICLE
router.patch('/:articleId', authorization, validation.article, controller.updateArticle);
// GET ALL ARTICLE
router.get('/', authorization, controller.getAllArticles);
// GET SINGLE ARTICLE
router.get('/:articleId', authorization, controller.getSingleArticle);
// DELETE ARTICLE
router.delete('/:articleId', authorization, controller.deleteSingleArticle);

//  FLAG AN INAPPROPRIATE ARTRICLE ROUTE
router.patch('/:articleId/flag', validation.flagArticle,  controller.flagArticles);


module.exports = router;