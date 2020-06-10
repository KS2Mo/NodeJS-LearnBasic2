const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const passportJWT = require('../middleware/passportJWT');
/* GET users listing. */
router.get('/',passportJWT.isLogin,staffController.index);
router.get('/:id',passportJWT.isLogin,staffController.show);
router.post('/',passportJWT.isLogin,staffController.insert);
router.delete('/:id',passportJWT.isLogin,staffController.destroy);
router.put('/:id',passportJWT.isLogin,staffController.update);
module.exports = router;
