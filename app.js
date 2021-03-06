/*
 * Copyright (C) 2014 Daiki Nogami.
 * All rights reserved.
 */

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth-connect');
var config = require('./config/environment');
var keys = require('./config/appkey');
var routes = require('./routes/index');


// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

//log output
if (app.get('env') == 'production') {
    var fs = require('fs');
    var stream = fs.createWriteStream(__dirname + '/public/accessLog.txt', { flags: 'a' });
    app.use(logger('combined', { stream: stream }));
} else {
    app.use(logger('dev'));
}

//basic authentication
app.use(basicAuth(keys.name, keys.pass));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/console', require('./console'));
app.use('/api/voice', require('./api/voice'));
app.use('/api/register', require('./api/register'));
app.use('/api/gcm', require('./api/gcm'));
app.use('/api/log', require('./api/log'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
