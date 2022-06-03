const router = require("express").Router()
const validInfo = require("../middleware/validInfo");
const controller = require('../controller/gifController');


router.post('/', controller.createGif );


module.exports =  router