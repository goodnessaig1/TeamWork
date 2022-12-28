const router = require('express').Router();
const controller = require('../controller/adminController');
const authorizations = require('../middleware/authorization');
const validation = require('../middleware/validation');

router.post('/create-user', validation.signup, controller.register);
router.post('/signin', validation.logIn, controller.loginUser);
router.get('/auth', authorizations, controller.userAuth);
router.patch('/upload_pix', authorizations, controller.userProfilePix);
router.patch('/cover_photo', authorizations, controller.userCoverPhoto);
router.patch('/number', authorizations, controller.phoneNumber);
router.get('/users', controller.getAllUsers);
router.patch('/change_password', authorizations, controller.changePassword);

module.exports = router;
