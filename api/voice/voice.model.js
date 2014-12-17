/*
 * Copyright (C) 2014 Daiki Nogami.
 * All rights reserved.
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VoiceSchema = new Schema({
    path: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    name: { type: String, required: true },
    key: {type: String, required: true},
    created: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Voice', VoiceSchema);