'use strict';

angular.module('App').
  controller('UsersCtrl', function($scope, Auth) {
		Auth.listUsers().
		then(function(users) {
			$scope.users = users;
		}).
		catch(function (err) {
			console.log(err);
		});
	});