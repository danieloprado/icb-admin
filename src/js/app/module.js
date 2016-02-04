(function(angular) {
  'use strict';

  angular.module('icbApp', [
    'ngMaterial',
    'ngMdIcons',
    'ngMessages',
    'ngAnimate',
    'ngRoute',
    'angular-jwt',
    'hc.marked',
    'md.data.table',
    'icbAuth',
    'icbInformative'
  ]).constant('API', '/api');

})(angular);