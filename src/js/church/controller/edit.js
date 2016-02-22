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

    uiGmapGoogleMapApi.then(function(maps) {
      console.log(maps);
    });

    $scope.map = {
      center: {
        latitude: 51.219053,
        longitude: 4.404418
      },
      zoom: 14
    };

    $scope.options = {
      scrollwheel: false
    };

  }

})(angular);