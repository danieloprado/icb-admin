(function(angular) {
  'use strict';

  angular.module("icbApp")
    .factory("authInterceptor", ["auth", factory]);

  function factory(auth) {
    return {
      request: function(config) {
        if (auth.hasToken()) {
          config.headers.Authorization = 'Bearer ' + auth.getToken();
        }

        return config;
      },
      response: function(response) {
        var token = response.headers('X-Token');
        if (token && token !== auth.getToken()) {
          auth.setToken(token);
        }

        return response;
      }
    };
  }
})(angular);