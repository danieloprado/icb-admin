(function(angular) {
  'use strict';

  angular.module('icbInformative')
    .controller("icbInformative.homeCtrl", [
      '$scope',
      'informativeService',
      HomeCtrl
    ]);

  function HomeCtrl($scope, informativeService) {
    $scope.$emit("change-page-title", "Informative");

    informativeService.list().then(function(response) {
      console.log(response);
    });

    $scope.create = () => {
      informativeService.create();
    };
  }

})(angular);