(function(angular) {
  'use strict';

  angular.module('icbInformative')
    .controller("icbInformative.homeCtrl", [
      '$scope',
      'informativeService',
      HomeCtrl
    ]);

  function HomeCtrl($scope, informativeService) {
    informativeService.list().then(function(response) {
      console.log(response);
    });
  }

})(angular);