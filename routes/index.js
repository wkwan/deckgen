var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('get the home page');
    res.render('index', { title: "Chirp"});
});

module.exports = router;