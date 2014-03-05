'use strict';

angular.module('App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'authentication'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/users', {
        templateUrl: 'partials/users',
        controller: 'UsersCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });