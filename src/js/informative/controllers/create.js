((angular) => {
  'use strict';

  angular.module('icbInformative')
    .controller("icbInformative.formCtrl", [
      '$scope',
      'Loader',
      'Toast',
      'informative',
      'informativeService',
      FormCtrl
    ]);

  function FormCtrl($scope, Loader, Toast, informative, service) {
    $scope.model = informative;

    $scope.submit = function() {
      Loader(service.save($scope.model))
        .then(function() {
          $scope.model = {};
        })
        .catch(function(res) {
          switch (res.status) {
            case 400:
              Toast(res.data.message);
              break;
            default:
              Toast("Ocorreu um erro no servidor");
          }
        });
    };

  }

})(angular);