const router = require("express").Router()
const controller = require('../controller/gifController');


router.post('/', controller.createGif );


module.exports =  router