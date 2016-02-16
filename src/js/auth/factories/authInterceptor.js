(function(angular) {
  'use strict';

  angular.module("icbAuth").factory("authInterceptor", ["$q", "$injector", "auth", AuthInterceptor]);

  function AuthInterceptor($q, $injector, auth) {
    const retry = (response, deferred) => {
      const $http = $injector.get("$http");

      $http(response.config).then((response) => {
        deferred.resolve(response);
      }).catch((response) => {
        deferred.reject(response);
      });
    };

    const resolveLogin = (response, deferred) => {
      const loginService = $injector.get("loginService");
      const Loader = $injector.get("Loader");

      Loader.disable();
      loginService.openLogin().then(() => {
        console.log("login finished");

        Loader.enable();
        retry(response, deferred);
      });
    };

    const resolveChurch = (response, deferred) => {
      const loginService = $injector.get("authChurchService");
      const Loader = $injector.get("Loader");

      Loader.disable();
      loginService.openSelection().then(() => {
        Loader.enable();
        retry(response, deferred);
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

        switch (response.status) {
          case 401:
            resolveLogin(response, deferred);
            break;
          case 403:

            switch (response.data.error) {
              case "church":
                resolveChurch(response, deferred);
                break;
              default:
                deferred.reject(response);
            }

            break;
          default:
            deferred.reject(response);
        }

        return deferred.promise;
      }
    };
  }
})(angular);