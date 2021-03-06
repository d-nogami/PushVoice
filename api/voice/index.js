/*
 * Copyright (C) 2014 Daiki Nogami.
 * All rights reserved.
 */

'use strict';

var express = require('express');
var controller = require('./voice.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/latest', controller.latest);
router.get('/:id', controller.show);
router.delete('/:id', controller.destroy);

module.exports = router;