var express = require('express');
var uploadFile = require('./uploadFile');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<h1>Working!</h1>'
    );
});


router.post('/api/voice', function(req, res) {
    uploadFile(req, res);
});

router.get('/api/gcm', function(req, res) {
    var pushNotification = require('../lib/pushNotification');
    pushNotification.sendMessage('test', 'Ayaka');
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
        '<h1>Send GCM!</h1>'
    );
});

module.exports = router;
