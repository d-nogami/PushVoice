/*
 * Copyright (C) 2014 Daiki Nogami.
 * All rights reserved.
 */

var latestVoice = {};
var sampleVoice = [
    {
        type: 'voice',
        url: '/sample/aiai_chottokowaikana.mp4',
        name: 'ぁぃぁぃ'
    },
    {
        type: 'voice',
        url: '/sample/aiai_oideoide.mp4',
        name: 'ぁぃぁぃ'
    },
    {
        type: 'voice',
        url: '/sample/rikachan_zikoshokai.mp4',
        name: 'りかちゃん'
    },
    {
        type: 'voice',
        url: '/sample/ayaka_kincho.mp4',
        name: '彩花'
    },
    {
        type: 'voice',
        url: '/sample/hinata_robosan.mp4',
        name: 'ひなた'
    }
]

var util = {
    setLatestVoice: function (item) {
        if (item.path && item.url && item.key) {
            latestVoice = item;
        }
    },
    getLatestVoice: function () {
        return latestVoice;
    },
    getSampleVoice: function () {
        var voice = sampleVoice[Math.floor(Math.random() * sampleVoice.length)];
        return voice;
    }
}

// Expose app
module.exports = util;
