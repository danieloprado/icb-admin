((angular) => {
  'use strict';

  angular.module('icbInformative').controller("icbInformative.formCtrl", [
    '$scope',
    '$mdDialog',
    'Loader',
    'Toast',
    'informative',
    'informativeService',
    FormCtrl
  ]);

  function FormCtrl($scope, $mdDialog, Loader, Toast, informative, service) {
    $scope.model = informative || {};

    $scope.getFullMarkdown = () => {
      let title = $scope.model.title ? "# " + $scope.model.title : "";

      return title + "\n\n\n" + ($scope.model.message || "");
    };

    $scope.submit = () => {
      Loader(service.save($scope.model)).then((informative) => {
        Toast("Salvo");
        $mdDialog.hide(informative);
        $scope.model = {};
      }).catch((res) => {
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

})(angular);