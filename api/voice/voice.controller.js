/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /voice              ->  show all
 * GET     /voice/:id          ->  show
 * DELETE  /voice/:id          ->  destroy
 */

'use strict';

var fs = require('fs');
var debugLog = require('../../lib/debugLog');
var DB = require('./voice.model');

// Get list of items
exports.index = function(req, res) {
    DB.find(function (err, items) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(items);
    });
};

// Get a single item
exports.show = function(req, res) {
    DB.find({key: req.params.id}, function (err, item) {
        if (err) { return handleError(res, err); }
        if (!item) { return res.status(404).end(); }
        return res.json(item);
    });
};

// Deletes a item from the DB and storage
exports.destroy = function(req, res) {
    DB.findOne({key: req.params.id}, function (err, item) {
        if (err) { return handleError(res, err); }
        if (!item) { return res.status(404).end(); }

//        item.remove(function(err) {
//            if (err) { return handleError(res, err); }
//            return res.send(204);
//        });

        var target = item;
        fs.unlink(target.path, function (err) {
            if (err) { return handleError(res, err); }
            debugLog('successfully deleted ' + target.path);

            target.remove(function(err) {
                if (err) { return handleError(res, err); }
                return res.status(204).end();
            });
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}