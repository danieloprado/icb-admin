(function(angular) {
  'use strict';

  angular.module('icbInformative')
    .controller("icbInformative.listCtrl", [
      '$scope',
      'Dialog',
      'Toast',
      'informativeService',
      ListCtrl
    ]);

  function ListCtrl($scope, dialog, Toast, service) {
    $scope.$emit("change-page-title", "Informativos");
    $scope.selected = [];

    $scope.query = {
      order: "title"
    };

    $scope.dataPromise = service.list().then((data) => {
      $scope.informatives = data;
    });

    $scope.create = ($event) => {
      service.form($event).then((informative) => {
        $scope.informatives.push(informative);
      });
    };

    $scope.edit = ($event, informative) => {
      service.form($event, informative).then((newInformative) => {
        angular.extend(informative, newInformative);
      });
    };

    $scope.delete = ($event, informative, index) => {
      dialog.confirm(`Deseja apagar o informativo **${informative.title}**`, $event)
        .then(() => {
          $scope.informatives.splice(index, 1);
          service.remove(informative._id).catch(() => {
            Toast(`Não foi possível apagar o informativo **${informative.title}**`);
            $scope.informatives.push(informative);
          });
        });
    };
  }

})(angular);