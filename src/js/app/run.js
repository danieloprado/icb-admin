(angular => {
  'use strict';

  angular.module('icbApp')
    .run(['$rootScope', '$location', 'auth', 'loginService', loginCheck]);

  function loginCheck($rootScope, $location, auth, loginService) {
    $rootScope.$on("$routeChangeStart", ($event, next) => {
      if (!next.$$route || next.$$route.allowAnonymous || auth.hasToken()) {
        return true;
      }

      next.$$route.resolve = next.$$route.resolve || {};
      next.$$route.resolve.login = () => loginService.openLogin();
    });

    $rootScope.$on("$routeChangeError", loginService.logout);
  }




})(angular);