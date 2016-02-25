(function(angular) {
  'use strict';

  angular.module('icbApp', [
    'ngSanitize',
    'ngMaterial',
    'ngMdIcons',
    'ngMessages',
    'ngAnimate',
    'ngRoute',
    'ngMask',
    'angular-jwt',
    'hc.marked',
    'md.data.table',
    'mdFormValidator',
    'uiGmapgoogle-maps',
    'icbAuth',
    'icbChurch',
    'icbEvent',
    'icbInformative'
  ]).constant('API', '/api');

})(angular);