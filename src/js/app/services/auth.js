(function() {
  'use strict';

  angular.module('App')
  .factory('auth', ['$rootScope', '$timeout', 'jwtHelper', '$window', '$log', authService]);

  function authService($rootScope, $timeout, jwtHelper, $window, console) {

    function isValidToken(token) {
      try {
        return token && !jwtHelper.isTokenExpired(token);
      } catch(err) {
        return false;
      }
    }

    function getToken() {
      return $window.localStorage.getItem('token');
    }

    function setToken(token) {
      if (!isValidToken(token)) {
        return false;
      }

      console.log('updating token');
      $window.localStorage.setItem('token', token);

      $rootScope.$broadcast('user-login');
    }

    function removeToken() {
      console.log('logout');
      $window.localStorage.removeItem('token');

      $timeout(function() {
        $rootScope.$apply();
      });

      $rootScope.$broadcast('user-logout');
    }

    function isLoggedIn() {
      return isValidToken($window.localStorage.getItem('token'));
    }

    return {
      setToken: setToken,
      removeToken: removeToken,
      isLoggedIn: isLoggedIn,
      getToken: getToken
    };
  }

})();
