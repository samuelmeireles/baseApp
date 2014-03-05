'use strict';

angular.module('App').
	controller('MainCtrl', function () {
}).


	controller('LoginCtrl', function($scope, $http, Auth) {

		$scope.user = {};
		$scope.errors = {};

		$scope.login = function() {

			Auth.login({
				email: $scope.user.email,
				password: $scope.user.password
			}).
			catch(function(err) {
				err = err.data;
				$scope.errors.other = err.message;
			});
		
		};
	}).

	controller('SignupCtrl', function($scope, $http, Auth) {
		
		$scope.user = {};
		$scope.errors = {};

		$scope.register = function() {

			Auth.createUser({
				name: $scope.user.name,
				email: $scope.user.email,
				password: $scope.user.password
			}).
			catch(function(err) {
				err = err.data;
				$scope.errors.other = err.message;
			});
		
		};
	});