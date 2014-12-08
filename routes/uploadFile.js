var uploadFile = function(req, res) {
    var formidable = require('formidable');
    var fs = require('fs');
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/voice";
    form.encoding = 'binary';

    form.parse(req, function (err, fields, files) {

        var oldPath = './' + files.file._writeStream.path;
        var newPath = './' + files.file._writeStream.path + '-' + files.file.name;

        //Filename becomes RANDOM_CODE + '-' + FILE_NAME
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
        });

        //Save file path to DB
        var uuid = require('node-uuid');
        var DB = require('../api/voice/voice.model');
        DB.find({path: newPath}, function (err, item) {
            if (err) { return res.send(500, err); }
            if(!item) { return res.send(404); }

            var newItem = {
                path: newPath,
                url: newPath.substr(newPath.indexOf('public') + 'public'.length),
                key: uuid.v1()
            }
            DB.create(newItem, function (err, item) {
                if (err) { return res.send(500, err); }

//                var pushNotification = require('../../lib/pushNotification');
//                pushNotification.sendMessage(item.url);

                res.writeHead(200, {'content-type': 'text/html'});
                res.write('received upload:\n\n');
                return res.send();
            });
        });
    });
}

module.exports = uploadFile;


