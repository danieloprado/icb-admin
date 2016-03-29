(function(angular) {
  'use strict';

  angular.module('icbApp')
    .controller("icbApp.appCtrl", [
      '$scope',
      '$mdSidenav',
      '$rootScope',
      'Auth',
      AppCtrl
    ]);

  function AppCtrl($scope, $mdSidenav, $rootScope, Auth) {
    $rootScope.pageTitle = "Home";

    $scope.$on("change-page-title", (info, data) => {
      $rootScope.pageTitle = data;
    });

    if (Auth.hasToken()) {
      $rootScope.user = Auth.getUser();
    }

    $scope.$on("user-token-changed", () => {
      $rootScope.user = Auth.getUser();
    });

    $scope.toggleSidenav = (menuId) => {
      $mdSidenav('left').toggle();
    };

  }

})(angular);