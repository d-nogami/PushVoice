/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /voice              ->  show all
 * GET     /voice/:id          ->  show
 * DELETE  /voice/:id          ->  destroy
 */

'use strict';

var DB = require('./register.model.js');

// Get list of items
exports.index = function(req, res) {
    DB.find(function (err, items) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(items);
    });
};

// Get a single item
exports.show = function(req, res) {
    DB.find({registrationId: req.params.id}, function (err, item) {
        if (err) { return handleError(res, err); }
        if (!item) { return res.status(404).end(); }
        return res.json(item);
    });
};

// Creates a new item in the DB.
exports.create = function(req, res) {
    if (req.body.registrationId) {
        DB.create(req.body, function (err, item) {
            if(err) { return handleError(res, err); }
            return res.status(201).json(item);
        });
    } else {
        return handleError(res, {message: 'Invalid parameter of request body.'});
    }
};

// Deletes a item from the DB and storage
exports.destroy = function(req, res) {
    DB.findOne({registrationId: req.params.id}, function (err, item) {
        if (err) { return handleError(res, err); }
        if (!item) { return res.status(404).end(); }

        item.remove(function(err) {
            if (err) { return handleError(res, err); }
            return res.status(204).end();
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}