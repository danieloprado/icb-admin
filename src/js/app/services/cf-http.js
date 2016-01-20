(function() {
  'use strict';

  angular.module('App')
  .factory('cfHttp', ['$rootScope', '$http', '$log', cfHttp]);

  function cfHttp($rootScope, $http, console) {

    var loadingEndpoints = 0;

    function openRequest() {
      loadingEndpoints++;

      if (loadingEndpoints == 1) {
        $rootScope.$broadcast('loading-started');
      }
    }

    function closeRequest() {
      loadingEndpoints--;

      if (loadingEndpoints === 0) {
        $rootScope.$broadcast('loading-finished');
      }
    }

    function get(url, config) {
      openRequest();
      var promise = $http.get(url, config);
      promise.finally(closeRequest);
      return promise;
    }

    function post(url, data, config) {
      openRequest();
      var promise = $http.post(url, data, config);
      promise.finally(closeRequest);
      return promise;
    }

    function isLoading() {
      return loadingEndpoints > 0;
    }

    return {
      get: get,
      post: post,
      isLoading: isLoading
    };
  }

})();
