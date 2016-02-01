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
      link: (scope, elem) => {
        scope.hide = true;

        scope.$on('show-login', function() {
          elem.find('section').addClass("fadeIn");
          elem.find('section').removeClass("fadeOut");

          elem.find('.content').addClass("fadeInDown");
          elem.find('.content').removeClass("fadeOutDown");

          scope.hide = false;
        });

        scope.$on('hide-login', function() {
          elem.find('section').addClass("fadeOut");
          elem.find('section').removeClass("fadeIn");

          elem.find('.content').addClass("fadeOutUp");
          elem.find('.content').removeClass("fadeInDown");

          scope.hide = true;
        });

      }

    };

  }

})();