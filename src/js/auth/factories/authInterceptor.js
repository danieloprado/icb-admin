(function(angular) {
  'use strict';

  angular.module("icbAuth").factory("authInterceptor", ["$q", "$injector", "auth", AuthInterceptor]);

  function AuthInterceptor($q, $injector, auth) {
    const retry = (response) => {
      const $http = $injector.get("$http");

      $http(response.config).then((response) => {
        deferred.resolve(response);
      }).catch((response) => {
        deferred.reject(response);
      });
    };

    const resolveLogin = (deferred) => {
      const loginService = $injector.get("loginService");
      const Loader = $injector.get("Loader");

      Loader.disable();
      loginService.openLogin().then(() => {
        Loader.enable();
        retry();
      });
    };

    const resolveChurch = (deferred) => {
      const loginService = $injector.get("loginService");
      const Loader = $injector.get("Loader");

      Loader.disable();
      loginService.openSelectChurch().then(() => {
        Loader.enable();
        retry();
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
            resolveLogin(deferred);
            break;
          case 403:

            switch (response.data.error) {
              case "church":
                resolveChurch(deferred);
                break;
              default:
                console.log(response);
                deferred.reject(response);
            }

            break;
          default:
            $injector.get("Toast").genericError();
            deferred.reject(response);
        }

        return deferred.promise;
      }
    };
  }
})(angular);