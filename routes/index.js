var express = require('express');
var uploadFile = require('./uploadFile');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
            '<form action="/voice" enctype="multipart/form-data" method="post">'+
            '<input type="file" name="file" multiple="multiple"><br>'+
            '<input type="submit" value="upload">'+
            '</form>'
    );
});

router.post('/voice', function(req, res) {
    uploadFile(req, res);
});




module.exports = router;
