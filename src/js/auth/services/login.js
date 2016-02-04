(function(angular) {
  'use strict';

  angular.module('icbAuth').service('loginService', [
    'API',
    '$http',
    '$q',
    '$timeout',
    '$rootScope',
    '$route',
    'auth',
    LoginService
  ]);

  function LoginService(API, $http, $q, $timeout, $rootScope, $route, auth) {
    let loginPromise = null;
    let endpoints = {
      login: API + '/auth/login'
    };

    this.openLogin = () => {
      loginPromise = $q.defer();

      $timeout(() => $rootScope.$broadcast("show-login"));
      return loginPromise.promise;
    };

    this.login = (credentials) => {
      var promise = $http.post(endpoints.login, credentials);

      promise.then(() => {
        console.log("login success");
        loginPromise.resolve();
        $timeout(() => $rootScope.$broadcast("hide-login"));
      });

      return promise;
    };

    this.logout = () => {
      auth.removeToken();
      $route.reload();
    };
  }

})(angular);
