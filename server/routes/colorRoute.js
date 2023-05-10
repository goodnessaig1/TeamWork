const router = require('express').Router();
const controller = require('../controller/colorController');
const isAdmin = require('../middleware/admin');
const authorization = require('../middleware/authorization');

router.post('/', authorization, isAdmin, controller.createColor);
router.delete(
  '/:colorId',
  authorization,
  isAdmin,
  controller.deleteSingleColor
);

router.get('/', authorization, controller.getAllColors);
router.patch('/:colorId', authorization, isAdmin, controller.updateColors);

module.exports = router;
