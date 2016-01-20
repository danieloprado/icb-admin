(function() {
    'use strict';

    angular.module('App')
    .controller('AppCtrl', ['$scope', 'auth', '$window', '$mdSidenav', ctrl]);

    function ctrl($scope, auth, $window, $mdSidenav) {

      $scope.isAuthenticated = auth.isLoggedIn();

      $scope.$on('user-login', function() {
        $scope.isAuthenticated = true;
      });

      $scope.$on('user-logout', function() {
        $scope.isAuthenticated = false;
      });

      $scope.redirect = function(x) {
        $window.location = '#' + x;
      };

      $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
      };
    }

})();
