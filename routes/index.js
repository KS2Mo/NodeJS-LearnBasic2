const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.status(200).json({
    message:'Hello Index'
  })
});


router.get('/login', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.status(200).json({
    message:'Hello login'
  })
});

module.exports = router;
