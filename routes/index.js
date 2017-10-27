var express = require('express');
var router = express.Router();
var path = require('path');

var projects = require(path.join(__dirname, 'projectObj'));

router.get('/', function(req, res, next) {
    res.render('index.njk');
});


module.exports = router;
