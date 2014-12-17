/*
 * Copyright (C) 2014 Daiki Nogami.
 * All rights reserved.
 */

var winston = require('winston');
var customColors = {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red'
};

winston.setLevels(winston.config.syslog.levels);
winston.addColors(customColors);

var logger = new (winston.Logger)({
    colors: customColors,
    levels: {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        error: 4
    },
    transports: [
        // Console.
        new winston.transports.Console({
            level: 'trace',
            colorize: true,
            timestamp: true
        }),
        // File.
        new winston.transports.File({
            filename: 'public/internalLog.txt',
            level: 'info',
            timestamp: true,
            json: false,
            maxsize: 1000000,
            maxFiles: 5
        })
    ]
});

if(process.env.NODE_ENV === 'production') {
    logger.remove(winston.transports.Console);
}

module.exports = logger;
