const router = require("express").Router()
const validInfo = require("../middleware/validInfo");
const controller = require('../controller/adminController');


router.post('/create-user', validInfo ,controller.register);
router.post('/login' ,validInfo, controller.loginUser);


module.exports =  router