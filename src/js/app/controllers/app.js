(function(angular) {
  'use strict';

  angular.module('icbApp')
    .controller("icbApp.appCtrl", [
      '$scope',
      '$mdSidenav',
      '$rootScope',
      AppCtrl
    ]);

  function AppCtrl($scope, $mdSidenav, $rootScope) {
    $rootScope.pageTitle = "Home";

    $scope.$on("change-page-title", function(info, data) {
      $rootScope.pageTitle = data;
    });

    $scope.toggleSidenav = function(menuId) {
      $mdSidenav('left').toggle();
    };

  }

})(angular);