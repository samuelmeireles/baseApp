'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  
  app.post('/api/1/users', users.create);
  app.put('/api/1/users', users.changePassword);
  app.get('/api/1/users', users.listUsers);
  app.get('/api/1/users/me', users.me);
  app.get('/api/1/users/:id', users.show);

  app.post('/api/1/session', session.login);
  app.del('/api/1/session', session.logout);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};