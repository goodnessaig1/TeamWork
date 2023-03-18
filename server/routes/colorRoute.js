const router = require('express').Router();
const controller = require('../controller/colorController');
const isAdmin = require('../middleware/admin');
const authorization = require('../middleware/authorization');

router.post('/', authorization, isAdmin, controller.createColor);

router.get('/', authorization, controller.getAllColors);

module.exports = router;
