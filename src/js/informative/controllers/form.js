((angular) => {
  'use strict';

  angular.module('icbInformative').controller("icbInformative.formCtrl", [
    '$scope',
    '$routeParams',
    '$location',
    'lodash',
    'Loader',
    'Toast',
    'informativeService',
    FormCtrl
  ]);

  function FormCtrl($scope, $routeParams, $location, _, Loader, Toast, service) {
    console.log($routeParams);

    $scope.model = {}; //informative || {};
    $scope.editing = !_.isEmpty($scope.model);

    $scope.getFullMarkdown = () => {
      let title = $scope.model.title ? "# " + $scope.model.title : "";
      return `${title}\n\n\n${$scope.model.message || ""}`;
    };

    $scope.submit = () => {
      Loader(service.save($scope.model))
        .then((informative) => {
          Toast("Salvo");
          $location.path('/informative');
        })
        .catch((res) => Toast.httpHandler(res));
    };

  }

})(angular);