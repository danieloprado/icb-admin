(function(angular) {
  'use strict';

  angular.module('icbInformative')
    .controller("icbInformative.listCtrl", [
      '$scope',
      '$mdDialog',
      'informativeService',
      ListCtrl
    ]);

  function ListCtrl($scope, $mdDialog, informativeService) {
    $scope.$emit("change-page-title", "Informative");
    $scope.selected = [];

    $scope.query = {
      order: "title"
    };

    $scope.dataPromise = informativeService.list().then((data) => {
      $scope.informatives = data;
    });

    $scope.create = ($event) => {
      informativeService.form($event).then((informative) => {
        $scope.informatives.push(informative);
      });
    };

    $scope.edit = ($event, informative) => {
      informativeService.form($event, informative).then((newInformative) => {
        angular.extend(informative, newInformative);
      });
    };

    $scope.delete = ($event, informative) => {
      const confirm = $mdDialog.confirm()
        .title("Confirmar")
        .textContent("Tem certeza?")
        .ok("Sim")
        .cancel("Não")
        .targetEvent($event);

      $mdDialog.show(confirm).then(() => {
        console.log("é verdade");
      });
    };
  }

})(angular);