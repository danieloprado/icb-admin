((angular) => {
  'use strict';

  angular.module('icbEvent').controller("icbEvent.formCtrl", [
    '$scope',
    '$mdDialog',
    'lodash',
    'Loader',
    'Toast',
    'event',
    'eventService',
    FormCtrl
  ]);

  function FormCtrl($scope, $mdDialog, _, Loader, Toast, event, service) {
    $scope.model = event || {};
    $scope.editing = !_.isEmpty($scope.model);

    $scope.submit = () => {
      Loader(service.save($scope.model))
        .then((event) => {
          Toast("Salvo");
          $mdDialog.hide(event);
          $scope.model = {};
        }).catch((res) => {
          switch (res.status) {
            case 400:
              Toast(res.data.message);
              break;
            default:
              Toast.genericError();
          }
        });
    };

  }

})(angular);