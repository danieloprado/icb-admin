((angular) => {
  'use strict';

  angular.module('icbChurch')
    .controller("church.editCtrl", [
      '$scope',
      'Toast',
      'churchService',
      EditCtrl
    ]);

  function EditCtrl($scope, Toast, service) {
    $scope.$emit("change-page-title", "Igreja");

  }

})(angular);