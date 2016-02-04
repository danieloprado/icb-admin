(function(angular) {
  'use strict';

  angular.module("icbAuth")
    .factory("authInterceptor", ["$q", "$injector", "auth", AuthInterceptor]);

  function AuthInterceptor($q, $injector, auth) {
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
      },
      responseError: function(response) {
        if (response.status != 401) {
          return response;
        }

        console.log("resolve login");

        const loginService = $injector.get("loginService");
        const $http = $injector.get("$http");
        const Loader = $injector.get("Loader");

        const deferred = $q.defer();

        Loader.disable();
        loginService.openLogin().then(() => {
          Loader.enable();

          $http(response.config).then((response) => {
            deferred.resolve(response);
          }).catch((response) => {
            deferred.reject(response);
          });
        });

        return deferred.promise;
      }
    };
  }
})(angular);