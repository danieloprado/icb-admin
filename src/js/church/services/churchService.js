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
      list: API + '/informative/'
    };


    return {

    };
  }

})(angular);