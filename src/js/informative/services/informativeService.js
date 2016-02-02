(function(angular) {
  'use strict';

  angular.module('icbInformative')
    .service('informativeService', [
      'API',
      '$http',
      InformativeService
    ]);

  function InformativeService(API, $http) {
    let endpoints = {
      list: API + '/informative/'
    };

    this.list = () => {
      return $http.get(endpoints.list).then(function(response) {
        return response.data;
      });
    };
  }

})(angular);