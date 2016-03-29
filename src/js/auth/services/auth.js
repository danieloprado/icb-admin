(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .service('Auth', ['$window', 'jwtHelper', Auth]);

  function Auth($window, jwtHelper) {
    var isValidToken = token => {
      try {
        return token && !jwtHelper.isTokenExpired(token);
      } catch (err) {
        return false;
      }
    };

    this.getToken = () => $window.localStorage.getItem("token");

    this.setToken = (token) => {
      if (!isValidToken(token)) {
        return false;
      }

      $window.localStorage.setItem("token", token);
    };

    this.removeToken = () => $window.localStorage.removeItem("token");

    this.hasToken = () => isValidToken($window.localStorage.getItem('token'));

    this.getUser = function() {
      if (!this.hasToken()) return null;
      return jwtHelper.decodeToken(this.getToken());
    };
  }

})(angular);