(function() {
  'use strict';

  angular.module('icbAuth')
    .directive('icbLogin', ['LoginService', Login]);

  function Login(LoginService) {

    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'views/auth/login.html',
      controller: 'icbAuth.loginCtrl',
      link: (scope, elem) => {
        scope.hide = true;
        scope.service = LoginService;

        scope.$watch("service.showLogin", (show) => {
          scope.hide = !show;
        });

        scope.$watch("hide", (hide) => {
          if (hide) {
            elem.find('section').addClass("fadeOut");
            elem.find('section').removeClass("fadeIn");

            elem.find('.content').addClass("fadeOutUp");
            elem.find('.content').removeClass("fadeInDown");
            return;
          }

          elem.find('section').addClass("fadeIn");
          elem.find('section').removeClass("fadeOut");

          elem.find('.content').addClass("fadeInDown");
          elem.find('.content').removeClass("fadeOutDown");
        });

      }

    };

  }

})();