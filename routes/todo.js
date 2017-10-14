var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/todo', function(req, res, next) {
    res.sendFile('/todo/index.html', {root: __dirname});
});
router.route('/todo/api')
    .get(function(req, res, next) {
        res.send('This will work');
    })
    .post(function(req, res, next) {

    })
    .put(function(req, res, next) {

    });
    
module.exports = router;
