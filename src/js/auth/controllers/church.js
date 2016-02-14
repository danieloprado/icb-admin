((angular) => {
  'use strict';

  angular.module('icbInformative').controller("icbAuth.churchCtrl", [
    '$scope',
    '$mdDialog',
    'Loader',
    'Toast',
    'loginService',
    FormCtrl
  ]);

  function FormCtrl($scope, $mdDialog, Loader, Toast, service) {

    $scope.submit = () => {
      Loader(service.save($scope.model)).then(() => {
        $mdDialog.hide();
      });
    };

  }

})(angular);