const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
/* GET users listing. */
router.get('/',shopController.index);
router.get('/menu',shopController.menu);
router.get('/:id',shopController.getShopWithMenu);
router.post('/',shopController.insert);
module.exports = router;
