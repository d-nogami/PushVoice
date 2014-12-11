var path = require('path');
var _ = require('lodash');
var keys = require('./appkey');

var common = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../..'),

    // Server port
    port: process.env.PORT || 9000,

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

// Expose app
module.exports = _.merge(common, env || {});
