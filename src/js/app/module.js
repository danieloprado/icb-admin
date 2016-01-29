(function(angular) {
  'use strict';

  angular.module('icbApp', [
      'ngMaterial',
      'ngMessages',
      'ngAnimate',
      'ngRoute',
      'icbAuth'
    ])
    .constant('API', '/api');

})(angular);