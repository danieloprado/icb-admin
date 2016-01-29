(function(angular) {
  'use strict';

  angular.module('icbApp')
    .config([
      '$mdThemingProvider',
      function($mdThemingProvider, $translateProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('blue');
      }
    ]);

})(angular);