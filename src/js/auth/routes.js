(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .config([
      '$routeProvider',
      function($routeProvider) {

        $routeProvider
          .when('/login', {
            templateUrl: 'view/auth/login.html',
            controller: 'icbAuth.loginCtrl'
          });
      }
    ]);

})(angular);