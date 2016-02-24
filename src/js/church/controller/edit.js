((angular) => {
  'use strict';

  angular.module('icbChurch')
    .controller("church.editCtrl", [
      '$scope',
      'uiGmapGoogleMapApi',
      'Loader',
      'Toast',
      'churchService',
      EditCtrl
    ]);

  function EditCtrl($scope, uiGmapGoogleMapApi, Loader, Toast, service) {
    $scope.$emit("change-page-title", "Igreja");
    $scope.model = {};

    Loader(service.current())
      .then((church) => {
        $scope.model = church;
      });

    $scope.submit = () => {
      Loader(service.save($scope.model))
        .then(() => {
          Toast("Informações atualizadas");
        });
    };

  }

})(angular);