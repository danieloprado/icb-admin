(function(angular) {
  'use strict';

  angular.module('icbAuth').run(['$rootScope', '$location', 'auth', 'loginService', loginCheck]);

  function loginCheck($rootScope, $location, auth, loginService) {
    $rootScope.$on("$routeChangeStart", ($event, next) => {
      alert('mudou!');
      if (!next.$$route || next.$$route.allowAnonymous || auth.hasToken()) {
        return true;
      }

      next.$$route.resolve = next.$$route.resolve || {};
      next.$$route.resolve.login = () => loginService.openLogin();
    });

    $rootScope.$on("$routeChangeSuccess", ($event, current) => {
      if (current.$$route.resolve && current.$$route.resolve.login) {
        delete current.$$route.resolve.login;
      }
    });

    $rootScope.$on("$routeChangeError", loginService.logout);
  }

})(angular);