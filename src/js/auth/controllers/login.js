(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .controller("icbAuth.loginCtrl", [
      '$scope',
      'Loader',
      'loginService',
      function($scope, Loader, loginService) {

        $scope.submit = function() {

          console.log('ok', $scope.model);
          return;
          //
          // Loader(loginService.login($scope.model))
          //   .then(function(data) {
          //     alert('ok');
          //   });
        };
      }
    ]);

})(angular);