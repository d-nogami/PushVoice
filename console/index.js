/*
 * Copyright (C) 2014 Daiki Nogami.
 * All rights reserved.
 */

'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

module.exports = router;