const router = require("express").Router()
const controller = require('../controller/gifController');
const commentController = require('../controller/gifComment');
const authorization = require("../middleware/authorization");
const validation = require("../middleware/validation");


//   GIF ROUTES FOR UPLOADING
router.post('/',authorization, controller.createGif );

//  GIF COMMENT ROUTES
router.post('/:gifId/comment',authorization, validation.comment, commentController.createComment)


module.exports =  router