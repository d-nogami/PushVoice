/*
 * Copyright (C) 2014 Daiki Nogami.
 * All rights reserved.
 */

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /voice              ->  show all
 * GET     /voice/:id          ->  show
 * DELETE  /voice/:id          ->  destroy
 */

'use strict';

var fs = require('fs');
var util = require('../../lib/util');
var logger = require('../../lib/debugLog');
var DB = require('./voice.model');

// Get list of items
exports.index = function(req, res) {
    DB.find(function (err, items) {
        if (err) {
            logger.error('[voice.controller.js] DB find error: ' + err);
            return handleError(res, err);
        }
        return res.status(200).json(items);
    });
};

// Get a single item
exports.show = function(req, res) {
    DB.find({key: req.params.id}, function (err, item) {
        if (err) {
            logger.error('[voice.controller.js] DB find error: ' + err);
            return handleError(res, err);
        }
        if (!item) {
            logger.warn('[voice.controller.js] DB no item');
            return res.status(404).end();
        }
        return res.json(item);
    });
};

// Get latest item
exports.latest = function(req, res) {
    var item = util.getLatestVoice();
    return res.json(item);
}

// Deletes a item from the DB and storage
exports.destroy = function(req, res) {
    DB.findOne({key: req.params.id}, function (err, item) {
        if (err) {
            logger.error('[voice.controller.js] DB findOne error: ' + err);
            return handleError(res, err);
        }
        if (!item) {
            logger.warn('[voice.controller.js] DB no item');
            return res.status(404).end();
        }

        var target = item;
        fs.unlink(target.path, function (err) {
            if (err) {
                logger.error('[voice.controller.js] Can\'t delete target file: ' + target.path);
                return handleError(res, err);
            }
            logger.info('[voice.controller.js] Successfully deleted: ' + target.path);

            target.remove(function(err) {
                if (err) {
                    logger.error('[voice.controller.js] DB findOne error: ' + err);
                    return handleError(res, err);
                }
                return res.status(204).end();
            });
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}