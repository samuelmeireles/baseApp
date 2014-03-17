'use strict';

var express = require('express'),
    path = require('path'),
    config = require('./config'),
    passport = require('passport'),
    mongoStore = require('connect-mongo')(express);

module.exports = function(app) {

  var rootPath = path.normalize(__dirname + '/../..');

  app.configure('development', function(){

    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
      }
      next();
    });

    app.use(express.static(path.join(rootPath, '.tmp')));
    app.use(express.static(path.join(rootPath, 'app')));
    app.use(express.errorHandler());
    app.set('views', rootPath + '/app/views');
  });

  app.configure('production', function(){
    app.use(express.favicon(path.join(rootPath, 'public', 'favicon.ico')));
    app.use(express.static(path.join(rootPath, 'public')));
    app.set('views', rootPath + '/views');
  });

  app.configure(function(){

    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    //Persist session with MongoStore Session Store
    app.use(express.session({
      secret: 'kksjahadflk____{|>dshfueu87&*ˆˆ%$opp*$$&@',
      store: new mongoStore({
        // url: config.mongo.uri,
        url: config.mongo.uri,
        collection: 'sessions'
      })
    }));

    //Passport Initializae and Session
    app.use(passport.initialize());
    app.use(passport.session());

    // Router needs to be last
    app.use(app.router);
  });
};
