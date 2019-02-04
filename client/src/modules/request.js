var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
    request({
        uri: 'http://localhost:81/api/curr',
        qs: {
        }
    }).pipe(res);
});

module.exports = router;

