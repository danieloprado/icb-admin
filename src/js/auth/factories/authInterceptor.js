(function(angular) {
  'use strict';

  angular.module("icbAuth").factory("AuthInterceptor", [
    "$q",
    "$injector",
    "$rootScope",
    "Auth",
    AuthInterceptor
  ]);

  function AuthInterceptor($q, $injector, $rootScope, Auth) {
    const resolveLogin = (response) => {
      const LoginService = $injector.get("LoginService");
      const Loader = $injector.get("Loader");

      Loader.disable();
      return LoginService.openLogin().then(() => {
        Loader.enable();
        return $injector.get("$http")(response.config);
      }).catch(err => {
        err = err || {
          status: 401
        };

        throw err;
      });
    };

    return {
      request: function(config) {
        if (Auth.hasToken()) {
          config.headers.Authorization = 'Bearer ' + Auth.getToken();
        }

        return config;
      },
      response: function(response) {
        var token = response.headers('X-Token');
        if (token && token !== Auth.getToken()) {
          Auth.setToken(token);
          $rootScope.$broadcast("user-token-changed");
        }

        return response;
      },
      responseError: function(response) {
        if (response.status == 401) {
          return resolveLogin(response);
        }

        return $q.reject(response);
      }
    };
  }
})(angular);