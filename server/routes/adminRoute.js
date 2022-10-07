const router = require('express').Router();
const controller = require('../controller/adminController');
const authorizations = require('../middleware/authorization');
const validation = require('../middleware/validation');

router.post('/create-user', validation.signup, controller.register);
router.post('/signin', validation.logIn, controller.loginUser);
router.get('/auth', authorizations, controller.userAuth);
router.get('/users', controller.getAllUsers);

module.exports = router;
