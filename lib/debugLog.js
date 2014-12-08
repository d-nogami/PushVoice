//var fs = require('fs');

var writeLog = function (str) {
    if(process.env.NODE_ENV === 'production') {
//        var stream = fs.createWriteStream(__dirname + '/public/log.txt', { flags: 'a' });
//        stream.write(str + '\n');
        console.log(str);
    } else {
        console.log(str);
    }
}

// Expose app
module.exports = writeLog;