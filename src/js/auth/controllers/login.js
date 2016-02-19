(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .controller("icbAuth.loginCtrl", [
      '$scope',
      '$timeout',
      'Toast',
      'Loader',
      'loginService',
      function($scope, $timeout, Toast, Loader, loginService) {
        //$scope.$emit("change-page-title", "Login");

        $scope.model = {
          email: "danieloprado@outlook.com",
          password: "123"
        };

        $scope.submit = function() {
          Loader(loginService.login($scope.model))
            .then(function() {
              $timeout(() => {
                $scope.model = {};
              }, 500);
            })
            .catch(function(res) {
              console.log(res);
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