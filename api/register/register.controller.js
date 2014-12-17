/*
 * Copyright (C) 2014 Daiki Nogami.
 * All rights reserved.
 */

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /register              ->  show all
 * GET     /register/:id          ->  show
 * DELETE  /register/:id          ->  destroy
 */

'use strict';

var logger = require('../../lib/debugLog');
var DB = require('./register.model.js');

// Get list of items
exports.index = function(req, res) {
    DB.find(function (err, items) {
        if (err) {
            logger.error('[register.controller.js] DB find error: ' + err);
            return handleError(res, err);
        }
        return res.status(200).json(items);
    });
};

// Get a single item
exports.show = function(req, res) {
    DB.find({registrationId: req.params.id}, function (err, item) {
        if (err) {
            logger.error('[register.controller.js] DB find error: ' + err);
            return handleError(res, err);
        }
        if (!item) {
            logger.warn('[register.controller.js] DB no item');
            return res.status(404).end();
        }
        return res.json(item);
    });
};

// Creates a new item in the DB.
exports.create = function(req, res) {
    if (req.body.registrationId) {
        DB.create(req.body, function (err, item) {
            if (err) {
                logger.error('[register.controller.js] DB create error: ' + err);
                return handleError(res, err);
            }
            return res.status(201).json(item);
        });
    } else {
        logger.error('[register.controller.js] Registration Id isn\'t included in request body: ' + req.body);
        return handleError(res, {message: 'Invalid parameter of request body.'});
    }
};

// Deletes a item from the DB and storage
exports.destroy = function(req, res) {
    DB.findOne({registrationId: req.params.id}, function (err, item) {
        if (err) {
            logger.error('[register.controller.js] DB findOne error: ' + err);
            return handleError(res, err);
        }
        if (!item) {
            logger.warn('[register.controller.js] DB no item');
            return res.status(404).end();
        }

        item.remove(function(err) {
            if (err) {
                logger.error('[register.controller.js] DB remove error: ' + err);
                return handleError(res, err);
            }
            return res.status(204).end();
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}