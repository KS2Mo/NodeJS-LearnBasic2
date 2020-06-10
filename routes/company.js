const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
/* GET users listing. */
router.get('/',companyController.index);


module.exports = router;
