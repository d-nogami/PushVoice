var latestVoice = {};


var util = {
    setLatestVoice: function (item) {
        if (item.path && item.url && item.key) {
            latestVoice = item;
        }
    },
    getLatestVoice: function () {
        return latestVoice;
    }
}

// Expose app
module.exports = util;
