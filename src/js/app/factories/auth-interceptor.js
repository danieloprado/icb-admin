(function() {
  'use strict';

  angular.module('App')
  .factory('authInterceptor', ['API', 'auth', authInterceptor]);

  function authInterceptor(API, auth) {
    return {
      request: function(config) {
        if (config.url.indexOf(API) === 0) {
          config.headers.Accept = 'application/json';
          if (auth.isLoggedIn()) {
            config.headers.Authorization = 'Bearer ' + auth.getToken();
          }
        }
        return config;
      },

      response: function(res) {
        var token = res.headers('X-Token');

        if (token && token !== auth.getToken()) {
          auth.setToken(token);
        }
        return res;
      },
    };
  }

})();
