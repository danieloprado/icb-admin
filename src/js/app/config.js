(function() {
  'use strict';

  var viewPath = '/view/app';

  angular.module('App', ['User', 'angular-jwt'])

  .config(['$routeProvider', configRouter])
  .config(['$httpProvider', configInterceptor]);

  function configInterceptor($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }

  function configRouter($routeProvider) {
    $routeProvider

      .when('/', {
        controller: 'App.HomeCtrl',
        templateUrl: viewPath + '/home.html'
      })

      .when('/login', {
        controller: 'App.LoginCtrl',
        templateUrl: viewPath + '/login.html'
      })

      .otherwise({
        redirectTo: '/'
      });
  }

})();
