(function(angular) {
  'use strict';

  angular.module('icbInformative')
    .config([
      '$routeProvider',
      Routes
    ]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/informative', {
        templateUrl: 'views/informative/index.html',
        controller: 'icbInformative.homeCtrl',
      });
  }

})(angular);