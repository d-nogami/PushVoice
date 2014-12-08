var gcm = require('node-gcm');
var DB = require('../api/register/register.model.js');
var debugLog = require('./debugLog');
var key = require('../config/appkey').value;

var sendMessage = function (url) {

    // with object values
    var message = new gcm.Message({
        collapseKey: 'pushvoice',
        delayWhileIdle: false,
        timeToLive: 600,
        data: {
            url: url
        }
    });

    var sender = new gcm.Sender(key);
    var registrationIds = [];

    // OPTIONAL
//    // add new key-value in data object
//    message.addDataWithKeyValue('key1','message1');
//    message.addDataWithKeyValue('key2','message2');
//
//    // or add a data object
//    message.addDataWithObject({
//        key1: 'message1',
//        key2: 'message2'
//    });
//
//    // or with backwards compability of previous versions
//    message.addData('key1','message1');
//    message.addData('key2','message2');


    message.dryRun = true;
    // END OPTIONAL

    // Get registered Ids from DB
    DB.find(function (err, items) {
        if (err) {
            debugLog('Can\'t get registration ids from DB.');
        } else {
            forEach(items, function (item) {
                registrationIds.push(item.registrationId);
            });
        }
    });

    /**
     * Params: message-literal, registrationIds-array, No. of retries, callback-function
     **/
    if (registrationIds.length > 0) {
        sender.send(message, registrationIds, 4, function (err, result) {
            debugLog(result);
        });
    }
}

// Expose app
module.exports = {
    sendMessage: sendMessage
};