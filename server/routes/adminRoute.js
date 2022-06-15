const router = require("express").Router()
const controller = require("../controller/adminController");
const validation = require("../middleware/validation");


router.post("/create-user",validation.signup , controller.register);
router.post('/login', validation.logIn , controller.loginUser);


module.exports =  router