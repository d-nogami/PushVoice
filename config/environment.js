/*
 * Copyright (C) 2014 Daiki Nogami.
 * All rights reserved.
 */

var path = require('path');
var _ = require('lodash');
var logger = require('../lib/debugLog');
var keys = require('./appkey');

var common = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../..'),

    // Server port
    port: process.env.PORT || 80,

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    }

};

var production = {
    mongo: {
        uri: keys.proddbpath
    }
}

var development = {
    mongo: {
        uri: keys.devdbpath
    }
}

var env = process.env.NODE_ENV === 'production' ? production : development;

logger.info('[environment.js] NODE_ENV: ' + process.env.NODE_ENV);

// Expose app
module.exports = _.merge(common, env || {});
