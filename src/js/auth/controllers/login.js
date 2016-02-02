(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .controller("icbAuth.loginCtrl", [
      '$scope',
      'Toast',
      'Loader',
      'loginService',
      function($scope, Toast, Loader, loginService) {
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
                  Toast(res.data.message);
                  break;
                default:
                  Toast("Ocorreu um erro no servidor");
              }
            });
        };

      }
    ]);

})(angular);