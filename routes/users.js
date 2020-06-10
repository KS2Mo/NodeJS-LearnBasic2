const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const passportJWT = require('../middleware/passportJWT');
/* GET users listing. */
router.get('/',userController.index);

router.post('/login', userController.login);

router.post('/register', [
    body('name').not().isEmpty().withMessage('กรุณากรอกข้อมูลชื่อ-สกุล'),
    body('email').not().isEmpty().withMessage('กรุณากรอกอีเมล์').isEmail().withMessage('รูปแบบอีเมล์ไม่ถูกต้อง'),
    body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่าน').isLength({min:3}).withMessage('กรุณากรอกจำนวนตัวอักษร 3 ตัวขึ้นไป')
],userController.register);


router.get('/me',[passportJWT.isLogin], userController.me);

module.exports = router;
