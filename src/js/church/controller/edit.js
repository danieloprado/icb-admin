((angular) => {
  'use strict';

  angular.module('icbChurch')
    .controller("church.editCtrl", [
      '$scope',
      'uiGmapGoogleMapApi',
      'Toast',
      'churchService',
      EditCtrl
    ]);

  function EditCtrl($scope, uiGmapGoogleMapApi, Toast, service) {
    $scope.$emit("change-page-title", "Igreja");
    $scope.location = {};

    $scope.$watch("location", (v) => {
      console.log(v);
    }, true);

  }

})(angular);