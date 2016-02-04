(function(angular) {
  'use strict';

  angular.module('icbApp')
    .controller("icbApp.homeCtrl", [
      '$scope',
      HomeCtrl
    ]);

  function HomeCtrl($scope) {
    $scope.$emit("change-page-title", "Dashboard");
  }

})(angular);