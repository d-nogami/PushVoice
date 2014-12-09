var path = require('path');
var _ = require('lodash');
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
        uri: 'mongodb://localhost/pushvoice'
    }
}

var development = {
    mongo: {
        uri: 'mongodb://localhost/pushvoice'
    }
}

var env = process.env.NODE_ENV === 'production' ? production : development;

// Expose app
module.exports = _.merge(common, env || {});
