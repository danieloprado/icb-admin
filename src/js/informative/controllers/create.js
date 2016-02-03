((angular) => {
  'use strict';

  angular.module('icbInformative')
    .controller("icbInformative.formCtrl", [
      '$scope',
      'informative',
      FormCtrl
    ]);

  function FormCtrl($scope, informative) {

  }

})(angular);