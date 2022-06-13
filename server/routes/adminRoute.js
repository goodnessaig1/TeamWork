const router = require("express").Router()
const controller = require("../controller/adminController");

router.post("/create-user",  controller.register);
router.post('/login' , controller.loginUser);


module.exports =  router