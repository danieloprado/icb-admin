(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .controller("icbAuth.loginCtrl", [
      '$scope',
      '$mdDialog',
      '$location',
      'Toast',
      'Loader',
      'Auth',
      'Dialog',
      'LoginService',
      function($scope, $mdDialog, $location, Toast, Loader, Auth, Dialog, LoginService) {
        $scope.model = {
          email: "danieloprado@outlook.com",
          password: "123"
        };

        if (Auth.hasToken()) {
          $scope.model.email = Auth.getUser().email;
          $scope.lockUser = true;
        }

        $scope.changeUser = () => {
          $mdDialog.cancel();
          LoginService.logout().then(_ => {
            $location.path("/");
          });
        };

        $scope.submit = () => {
          Loader(LoginService.login($scope.model))
            .then(() => $mdDialog.hide())
            .catch((res) => {
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