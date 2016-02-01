(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .controller("icbAuth.loginCtrl", [
      '$scope',
      'Loader',
      'loginService',
      function($scope, Loader, loginService) {
        $scope.model = {
          email: "danieloprado@outlook.com",
          password: "123"
        };

        $scope.submit = function() {
          $scope.errorMessage = null;

          Loader(loginService.login($scope.model))
            .then(function() {
              $scope.model = {};
            })
            .catch(function(res) {
              switch (res.status) {
                case 400:
                  $scope.errorMessage = res.data.message;
                  break;
                default:
                  $scope.errorMessage = "Ocorreu um erro no servidor";
              }
            });
        };

      }
    ]);

})(angular);