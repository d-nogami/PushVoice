var gcm = require('node-gcm');
var DB = require('../api/register/register.model.js');
var debugLog = require('./debugLog');
var key = require('../config/appkey').appkey;

var sendMessageAll = function (data) {
    // Get registered Ids from DB
    DB.find(function (err, items) {
        if (err) {
            debugLog('Can\'t get registration ids from DB.');
        } else {
            var registrationIds = [];
            for (var i = 0; i < items.length; i++) {
                registrationIds.push(items[i].registrationId);
            };

            executeSend(data, registrationIds);
        }
    });
}


function sendMessageOne (data, target) {
    var registrationIds = [];
    if (target) {
        registrationIds.push(target);
        executeSend(data, registrationIds);
    } else {
        // Get registered Ids from DB
        DB.find(function (err, items) {
            if (err) {
                debugLog('Can\'t get registration ids from DB.');
            } else {
                target = items[Math.floor(Math.random() * items.length)];
                registrationIds.push(target.registrationId);
                executeSend(data, registrationIds);
            }
        });
    }
}

function executeSend (data, regIds) {
    // with object values
    var message = new gcm.Message({
        collapseKey: 'pushvoice',
        delayWhileIdle: false,
        timeToLive: 600,
        data: data
    });

    var sender = new gcm.Sender(key);

    //Dry run
    message.dryRun = true;

    /**
     * Params: message-literal, registrationIds-array, No. of retries, callback-function
     **/
    if (regIds.length > 0) {
        sender.send(message, regIds, 4, function (err, result) {
            debugLog(result);
        });
    }

}

// Expose app
module.exports = {
    sendMessageAll: sendMessageAll,
    sendMessageOne: sendMessageOne
};