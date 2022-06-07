const router = require("express").Router()
const controller = require('../controller/gifController');
const authorization = require("../middleware/authorization");



router.post('/', authorization, controller.createGif );


module.exports =  router