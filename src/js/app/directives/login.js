(function() {
  'use strict';

  angular.module('App')
  .directive('cfLogin', ['loginService', cfLogin]);

  function cfLogin(loginService) {
    return {
      restrict: 'EA',
      scope: false,
      link: function(scope, element, attrs) {
        element.on('click', function() {
          loginService.login();
        });
      }
    };
  }

})();
