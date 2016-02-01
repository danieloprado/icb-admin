(function(angular) {
  'use strict';

  angular.module('icbApp')
    .config(['$mdThemingProvider', configTheme]);

  function configTheme($mdThemingProvider, $translateProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue');
  }

})(angular);