const router = require('express').Router();
const controller = require('../controller/categoryController');
const isAdmin = require('../middleware/admin');
const authorization = require('../middleware/authorization');
const validation = require('../middleware/validation');

router.post(
  '/',
  authorization,
  isAdmin,
  validation.category,
  controller.createCategory
);

router.get('/', authorization, controller.getAllCategories);

module.exports = router;
