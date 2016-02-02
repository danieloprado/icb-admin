(function(angular) {
  'use strict';

  angular.module('icbApp', [
      'ngMaterial',
      'ngMdIcons',
      'ngMessages',
      'ngAnimate',
      'ngRoute',
      'angular-jwt',
      'icbAuth',
      'icbInformative'
    ])
    .constant('API', '/api');

})(angular);