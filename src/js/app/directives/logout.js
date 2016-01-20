(function() {
  'use strict';

  angular.module('App')
  .directive('cfLogout', ['auth', cfLogin]);

  function cfLogin(auth) {
    return {
      restrict: 'EA',
      scope: false,
      link: function(scope, element, attrs) {
        element.on('click', function() {
          auth.removeToken();
        });
      }
    };
  }

})();
