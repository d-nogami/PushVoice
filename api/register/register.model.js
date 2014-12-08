'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RegisterSchema = new Schema({
    registrationId: { type: String, required: true, unique: true },
    created: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Register', RegisterSchema);