(function(angular) {
  'use strict';

  angular.module('icbEvent')
    .config([
      '$routeProvider',
      Routes
    ]);

  function Routes($routeProvider) {
    $routeProvider
      .when('/event', {
        templateUrl: '/views/event/list.html',
        controller: 'icbEvent.listCtrl',
      });
  }

})(angular);