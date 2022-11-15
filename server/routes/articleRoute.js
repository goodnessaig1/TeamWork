const router = require('express').Router();
const controller = require('../controller/articleController');
const controllers = require('../controller/likesController');
const articleController = require('../controller/articleComment');
const authorization = require('../middleware/authorization');
const validation = require('../middleware/validation');

// POST AN ARTICLE
router.post('/', authorization, validation.article, controller.createArticle);

// UPDATE ARTICLE
router.patch(
  '/:articleId',
  authorization,
  validation.article,
  controller.updateArticle
);
// GET ALL ARTICLE
router.get('/', authorization, controller.getAllArticles);
// GET SINGLE ARTICLE
router.get('/:articleId', authorization, controller.getSingleArticle);
router.get('/:articleId', authorization, controller.getArticleComment);
// DELETE ARTICLE
router.delete('/:articleId', authorization, controller.deleteSingleArticle);

//  FLAG AN INAPPROPRIATE ARTRICLE ROUTE
router.patch(
  '/:articleId/flag',
  validation.flagArticle,
  controller.flagArticles
);

// ARTICLE COMMENT ROUTE
router.post(
  '/:articleId/comment',
  authorization,
  validation.articleComment,
  articleController.createComment
);
router.post('/:articleId/like', authorization, controllers.addLikes);

module.exports = router;
