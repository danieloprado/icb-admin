(function() {
  'use strict';

  angular.module('icbAuth')
    .directive('icbLogin', [Login]);

  function Login() {

    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'views/auth/login.html',
      controller: 'icbAuth.loginCtrl',
      link: (scope) => {
        scope.hide = true;

        scope.$on('show-login', function() {
          scope.hide = false;
        });

        scope.$on('hide-login', function() {
          scope.hide = true;
        });

      }

    };

  }

})();