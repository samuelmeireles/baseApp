'use strict';

angular.module('authentication', ['ngResource', 'ngCookies', 'ngRoute']).

	//User resource
	factory('User', ['$resource', function($resource) {
		return $resource('/api/1/users/:id', {
			id: '@id'
		}, {
			update: {
				method: 'PUT',
				params: {}
			},
			get: {
				method: 'GET',
				isArray: true
			// 	params: {
			// 		id: 'me'
			// 	}
			}
		});
	}]).

	factory('Session', ['$resource', function($resource) {
		return $resource('/api/1/session/');
	}]).

	factory('Auth', ['$rootScope', '$location', '$cookieStore', 'User', 'Session',
	 function($rootScope, $location, $cookieStore, User, Session) {

		//Get currentUser from cookie
		$rootScope.currentUser = $cookieStore.get('user') || null;
		$cookieStore.remove('user');

		return {

			login: function(user, callback) {
			  var cb = callback || angular.noop;

			  return Session.save({
			    email: user.email,
			    password: user.password
			  }, function(user) {
			    $rootScope.currentUser = user;
			    return cb();
			  }, function(err) {
			    return cb(err);
			  }).$promise;
			},

			logout: function(callback) {
			  var cb = callback || angular.noop;

			  return Session.delete(function() {
			      $rootScope.currentUser = null;
			      return cb();
			    },
			    function(err) {
			      return cb(err);
			    }).$promise;
			},

			createUser: function(user, callback) {
			  var cb = callback || angular.noop;

			  return User.save(user,
			    function(user) {
			      $rootScope.currentUser = user;
			      return cb(user);
			    },
			    function(err) {
			      return cb(err);
			    })
			  .$promise;
			},

			changePassword: function(oldPassword, newPassword, callback) {
			  var cb = callback || angular.noop;

			  return User.update({
			    oldPassword: oldPassword,
			    newPassword: newPassword
			  }, function(user) {
			    return cb(user);
			  }, function(err) {
			    return cb(err);
			  }).$promise;
			},

			listUsers: function() {
				return User.get().$promise;
			},

			// currentUser: function() {
			//   return User.get();
			// },

			isLoggedIn: function() {
			  var user = $rootScope.currentUser;
			  return !!user;
			}
		};
	}]);