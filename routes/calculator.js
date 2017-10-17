var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
    console.log(__dirname);
    res.sendFile('index.html', { root: path.join(__dirname, '../calculator') });
});


module.exports = router;
