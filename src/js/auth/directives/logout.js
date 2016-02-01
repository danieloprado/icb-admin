(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .directive('icbLogout', ['loginService', '$timeout', Logout]);

  function Logout(loginService, $timeout) {

    return {
      restrict: 'A',
      scope: false,
      link: (scope, elem) => {
        angular.element(elem).on("click", function() {
          loginService.logout();
        });
      }
    };

  }

})(angular);