var express = require('express');
var router = express.Router();
var path = require('path');
var nunjucks = require('nunjucks');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

module.exports = router;
