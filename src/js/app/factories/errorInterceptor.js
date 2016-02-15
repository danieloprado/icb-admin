(function(angular) {
  'use strict';

  angular.module("icbApp").factory("errorInterceptor", [
    "$injector",
    ErrorInterceptor
  ]);

  function ErrorInterceptor($injector) {

    return {
      responseError: function(response) {
        if (response.status == 500) {
          $injector.get("Toast").genericError();
        }

        return response;
      }
    };
  }
})(angular);