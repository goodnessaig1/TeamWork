const router = require('express').Router();
const controller = require('../controller/gifController');
const commentController = require('../controller/gifComment');
const likeController = require('../controller/likesController');
const authorization = require('../middleware/authorization');
const validation = require('../middleware/validation');

//   GIF ROUTES FOR UPLOADING

router.post('/', authorization, controller.createGif);

router.get('/', authorization, controller.getAllgifs);

router.get('/:gifId', authorization, controller.getSingleGif);

router.delete('/:gifId', authorization, controller.deleteGif);

//  GIF COMMENT ROUTES
router.post(
  '/:gifId/comment',
  authorization,
  validation.comment,
  commentController.createComment
);
router.post('/:gifId/gif_likes', authorization, likeController.gifLike);

module.exports = router;
