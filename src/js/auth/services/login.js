(function(angular) {
  'use strict';

  angular.module('icbAuth').factory('LoginService', [
    'API',
    '$http',
    '$q',
    '$route',
    '$mdDialog',
    'Auth',
    LoginService
  ]);

  function LoginService(API, $http, $q, $route, $mdDialog, Auth) {
    let loginPromise = null;
    let endpoints = {
      login: API + '/auth/login'
    };

    this.showLogin = false;

    const openLogin = function() {
      return $mdDialog.show({
        templateUrl: '/views/auth/login.html',
        controller: 'icbAuth.loginCtrl',
        clickOutsideToClose: false,
        escapeToClose: false
      });
    };

    const login = (credentials) => {
      return $http.post(endpoints.login, credentials);
    };

    const logout = () => {
      Auth.removeToken();
      return $q.resolve();
    };

    return {
      openLogin,
      login,
      logout
    };
  }

})(angular);