(function(angular) {
  'use strict';

  angular.module("icbAuth").factory("authInterceptor", ["$q", "$injector", "auth", AuthInterceptor]);

  function AuthInterceptor($q, $injector, auth) {
    const resolveLogin = (response, deferred) => {
      const loginService = $injector.get("loginService");
      const Loader = $injector.get("Loader");

      Loader.disable();
      loginService.openLogin().then(() => {
        Loader.enable();

        const $http = $injector.get("$http");
        $http(response.config).then((response) => {
          deferred.resolve(response);
        }).catch((response) => {
          deferred.reject(response);
        });
      });
    };

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
        const deferred = $q.defer();

        if (response.status == 401) {
          resolveLogin(response, deferred);
          return deferred.promise;
        }

        deferred.reject(response);
        return deferred.promise;
      }
    };
  }
})(angular);