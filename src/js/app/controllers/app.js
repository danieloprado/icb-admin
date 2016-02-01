(function(angular) {
  'use strict';

  angular.module('icbApp')
    .controller("icbApp.appCtrl", [
      '$scope',
      '$mdSidenav',
      AppCtrl
    ]);

  function AppCtrl($scope, $mdSidenav) {

    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
  }

})(angular);