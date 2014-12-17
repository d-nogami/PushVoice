/*
 * Copyright (C) 2014 Daiki Nogami.
 * All rights reserved.
 */

'use strict';

var express = require('express');
var logger = require('../../lib/debugLog');
var pushNotification = require('../../lib/pushNotification');
var util = require('../../lib/util');
var registerIdDB = require('../register/register.model.js');
var voiceDB = require('../voice/voice.model');
var router = express.Router();

router.get('/tonton', function (req, res) {
    var name = req.query.name;
    var data = {
        type: 'tonton',
        name: name ? name : '校長'
    }

    if (req.query.id) {
        registerIdDB.findOne({registrationId: req.query.id}, function (err, item) {
            if (err) {
                logger.error('[gcm/index.js] Registration Id DB findOne error: ' + err);
                return handleError(res, err);
            }
            if (!item) {
                logger.warn('[gcm/index.js] Registration Id DB no item');
                return res.status(404).end();
            }
            pushNotification.sendMessageOne(data, item.registrationId);
            res.writeHead(200);
            res.end();
        });
    } else {
        pushNotification.sendMessageOne(data);
        res.writeHead(200);
        res.end();
    }
});


router.get('/voice', function (req, res) {
    var latest = util.getLatestVoice();
    if (latest.url) {
        var data = {
            type: 'voice',
            url: latest.url,
            name: latest.name
        }
        pushNotification.sendMessageAll(data);
        res.writeHead(200);
        res.end();
    } else {
        res.writeHead(500);
        res.end('No latest voice.');
    }
});

router.get('/voice/:id', function (req, res) {
    voiceDB.findOne({key: req.params.id}, function (err, item) {
        if (err) {
            logger.error('[gcm/index.js] Voice DB findOne error: ' + err);
            return handleError(res, err);
        }
        if (!item) {
            logger.warn('[gcm/index.js] Voice DB no item');
            return res.status(404).end();
        }
        var data = {
            type: 'voice',
            url: item.url,
            name: item.name
        }
        pushNotification.sendMessageAll(data);
        res.writeHead(200);
        res.end();
    });
});

function handleError(res, err) {
    return res.status(500).send(err);
}

module.exports = router;