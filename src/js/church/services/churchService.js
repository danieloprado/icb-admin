((angular) => {
  'use strict';

  angular.module('icbChurch')
    .factory('churchService', [
      'API',
      '$http',
      ChurchService
    ]);

  function ChurchService(API, $http) {
    let endpoints = {
      current: API + '/church/current'
    };

    const current = () => $http.get(endpoints.current).then(response => response.data);

    const save = (model) => $http.post(endpoints.current, model);

    return {
      current, save
    };
  }

})(angular);