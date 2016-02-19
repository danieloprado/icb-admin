(function(angular) {
  'use strict';

  angular.module('icbApp')
    .controller("icbApp.appCtrl", [
      '$scope',
      '$mdSidenav',
      '$rootScope',
      'auth',
      AppCtrl
    ]);

  function AppCtrl($scope, $mdSidenav, $rootScope, auth) {
    $rootScope.pageTitle = "Home";

    $scope.$on("change-page-title", (info, data) => {
      $rootScope.pageTitle = data;
    });

    if (auth.hasToken()) {
      $rootScope.user = auth.getUser();
    }

    $scope.$on("user-token-changed", () => {
      $rootScope.user = auth.getUser();
    });

    $scope.toggleSidenav = (menuId) => {
      $mdSidenav('left').toggle();
    };

  }

})(angular);