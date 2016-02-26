(function(angular) {
  'use strict';

  angular.module('icbAuth').service('loginService', [
    'API',
    '$http',
    '$q',
    '$timeout',
    '$rootScope',
    '$route',
    '$mdDialog',
    'auth',
    LoginService
  ]);

  function LoginService(API, $http, $q, $timeout, $rootScope, $route, $mdDialog, auth) {
    let loginPromise = null;
    let endpoints = {
      login: API + '/auth/login'
    };

    this.showLogin = false;

    this.openLogin = function() {
      loginPromise = $q.defer();

      this.showLogin = true;
      return loginPromise.promise;
    };

    this.login = (credentials) => {
      var promise = $http.post(endpoints.login, credentials);

      promise.then(() => {
        loginPromise.resolve();
        this.showLogin = false;
      });

      return promise;
    };

    this.logout = () => {
      auth.removeToken();
      $route.reload();
    };
  }

})(angular);