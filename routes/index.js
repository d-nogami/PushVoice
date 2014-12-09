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


router.post('/voice', function(req, res) {
    uploadFile(req, res);
});


module.exports = router;
