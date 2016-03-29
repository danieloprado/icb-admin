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
        templateUrl: '/views/informative/list.html',
        controller: 'icbInformative.listCtrl',
      })
      .when('/informative/create', {
        templateUrl: '/views/informative/form.html',
        controller: 'icbInformative.formCtrl',
      })
      .when('/informative/:id', {
        templateUrl: '/views/informative/form.html',
        controller: 'icbInformative.formCtrl',
      });
  }

})(angular);