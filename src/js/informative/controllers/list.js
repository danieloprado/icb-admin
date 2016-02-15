(function(angular) {
  'use strict';

  angular.module('icbInformative')
    .controller("icbInformative.listCtrl", [
      '$scope',
      'informativeService',
      ListCtrl
    ]);

  function ListCtrl($scope, informativeService) {
    $scope.$emit("change-page-title", "Informative");
    $scope.selected = [];

    $scope.query = {
      order: "title"
    };

    $scope.dataPromise = informativeService.list().then((data) => {
      console.log(data);
      $scope.informatives = data;
    });

    $scope.create = ($event) => {
      informativeService.form($event);
    };

    $scope.edit = ($event, informative) => {
      informativeService.form($event, informative);
    };
  }

})(angular);
