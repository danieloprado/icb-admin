(function(angular) {
  'use strict';

  angular.module("icbAuth").factory("authInterceptor", ["$q", "$injector", "auth", AuthInterceptor]);

  function AuthInterceptor($q, $injector, auth) {
    var resolveLogin = function(deferred) {
      const loginService = $injector.get("loginService");
      const $http = $injector.get("$http");
      const Loader = $injector.get("Loader");

      Loader.disable();
      loginService.openLogin().then(() => {
        Loader.enable();

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

        switch (response.status) {
          case 401:
            resolveLogin(deferred);
            break;
          case 403:
            console.log(response);
            deferred.reject(response);
            break;
          default:
            var Toast = $injector.get("Toast");
            Toast.genericError();
            deferred.reject(response);
        }

        return deferred.promise;
      }
    };
  }
})(angular);