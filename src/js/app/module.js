(function(angular) {
  'use strict';

  angular.module('icbApp', [
      'ngMaterial',
      'ngMessages',
      'ngAnimate',
      'ngRoute',
      'angular-jwt',
      'icbAuth'
    ])
    .constant('API', '/api');

})(angular);