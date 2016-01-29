(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .service('loginService', ['API', '$http', LoginService]);

  function LoginService(API, $http) {

    var endpoints = {
      login: API + '/auth/login'
    };

    this.login = (credentials) => {
      return $http.post(endpoints.login, credentials);
    };

  }

})(angular);