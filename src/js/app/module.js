(function(angular) {
  'use strict';

  angular.module('icbApp', [
    'ngSanitize',
    'ngMaterial',
    'ngMdIcons',
    'ngMessages',
    'ngAnimate',
    'ngRoute',
    'angular-jwt',
    'hc.marked',
    'md.data.table',
    'mdFormValidator',
    'icbAuth',
    'icbChurch',
    'icbInformative'
  ]).constant('API', '/api');

})(angular);