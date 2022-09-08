const router = require('express').Router();
const controller = require('../controller/gifController');
const commentController = require('../controller/gifComment');
const authorization = require('../middleware/authorization');
const validation = require('../middleware/validation');
// const formidable = require('express-formidable');

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

module.exports = router;
