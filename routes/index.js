/*
 * Copyright (C) 2014 Daiki Nogami.
 * All rights reserved.
 */

var express = require('express');
var uploadFile = require('./uploadFile');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<h1>Working!</h1>'
    );
});

router.get('/index.html', function (req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<h1>Working!</h1>'
    );
});


router.post('/api/voice', function(req, res) {
    uploadFile(req, res);
});

module.exports = router;
