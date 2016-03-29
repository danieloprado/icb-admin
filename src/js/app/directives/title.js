((angular) => {
  'use strict';

  angular.module('icbApp')
    .directive('icbTitle', [IcbTitle]);

  function IcbTitle() {

    return {
      restrict: 'E',
      scope: false,
      link: ($scope, elem) => {
        $scope.$emit("change-page-title", elem.html());
        elem.remove();
      }
    };

  }

})(angular);