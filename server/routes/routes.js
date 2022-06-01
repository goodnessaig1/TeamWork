const router = require("express").Router()
const validInfo = require("../middleware/validInfo");
const controller = require('./admin');


router.post('/create-user', validInfo ,controller.register);
router.post('/login' ,validInfo,controller.loginUser);
module.exports =  router