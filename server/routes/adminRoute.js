const router = require('express').Router();
const controller = require('../controller/adminController');
const validation = require('../middleware/validation');

router.post('/create-user', validation.signup, controller.register);
router.post('/signin', validation.logIn, controller.loginUser);
router.get('/users', controller.getAllUsers);

module.exports = router;
