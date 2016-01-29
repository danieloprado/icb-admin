(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .config([
      '$routeProvider',
      function($routeProvider) {

        $routeProvider
          .when('/login', {
            templateUrl: 'views/auth/login.html',
            controller: 'icbAuth.loginCtrl'
          });
      }
    ]);

})(angular);