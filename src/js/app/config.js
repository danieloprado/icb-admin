(function(angular) {
  'use strict';

  angular.module('icbApp')
    .config(['$mdThemingProvider', configTheme])
    .config(['$httpProvider', configInterceptor]);

  function configTheme($mdThemingProvider, $translateProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue');
  }

  function configInterceptor($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }

})(angular);