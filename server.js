'use strict';

// Module dependencies.
var express = require('express'),  
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose');

// Default node enviroment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//App Configuration
var config = require('./lib/config/config.js');

// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Populate empty DB with dummy data
require('./lib/db/dummydata');

// Passport Configuration
require('./lib/config/passport')();

var app = express();

// Express Configuration
require('./lib/config/express')(app);

//Routes
require('./lib/routes')(app);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;