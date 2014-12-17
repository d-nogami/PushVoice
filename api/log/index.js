/*
 * Copyright (C) 2014 Daiki Nogami.
 * All rights reserved.
 */

'use strict';

var express = require('express');
var fs = require('fs');
var logger = require('../../lib/debugLog');
var dirPath = __dirname.substring(0, __dirname.indexOf('/api/gcm')) + 'public/';
var router = express.Router();

router.delete('/access', function (req, res) {
    fs.open(dirPath + 'accessLog.txt', 'w', function (err, fd) {
        if (err) {
            logger.error('[log/index.js] Can\'t open accessLog.txt: ' + err);
            handleError(res, err);
        } else {
            fs.close(fd, function (err) {
                if (err) {
                    logger.error('[log/index.js] Can\'t close accessLog.txt: ' + err);
                    handleError(res, err);
                } else {
                    res.writeHead(200);
                    res.end();
                }
            });
        }
    });
});


router.delete('/internal', function (req, res) {
    fs.open(dirPath + 'internalLog.txt', 'w', function (err, fd) {
        if (err) {
            logger.error('[log/index.js] Can\'t open internalLog.txt: ' + err);
            handleError(res, err);
        } else {
            fs.close(fd, function (err) {
                if (err) {
                    logger.error('[log/index.js] Can\'t close internalLog.txt: ' + err);
                    handleError(res, err);
                } else {
                    res.writeHead(200);
                    res.end();
                }
            });
        }
    });
});

function handleError(res, err) {
    return res.status(500).send(err);
}

module.exports = router;