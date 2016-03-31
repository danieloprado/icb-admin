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
    $scope.model = {};
    $scope.editing = false;

    if ($routeParams.id) {
      Loader(service.get($routeParams.id)).then(informative => {
        $scope.model = informative;
        $scope.editing = true;
      });
    }



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