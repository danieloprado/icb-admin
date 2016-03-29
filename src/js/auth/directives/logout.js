(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .directive('icbLogout', ['LoginService', '$timeout', Logout]);

  function Logout(LoginService, $timeout) {

    return {
      restrict: 'A',
      scope: false,
      link: (scope, elem) => {
        angular.element(elem).on("click", function() {
          LoginService.logout();
        });
      }
    };

  }

})(angular);