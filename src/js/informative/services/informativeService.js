((angular) => {
  'use strict';

  angular.module('icbInformative')
    .factory('informativeService', [
      'API',
      '$http',
      '$mdDialog',
      InformativeService
    ]);

  function InformativeService(API, $http, $mdDialog) {
    let endpoints = {
      list: API + '/informative/'
    };

    const list = () => {
      return $http.get(endpoints.list).then(function(response) {
        return response.data;
      });
    };

    const create = ($event) => {
      $mdDialog.show({
        templateUrl: 'views/informative/form.html',
        controller: 'icbInformative.formCtrl',
        clickOutsideToClose: true,
        escapeToClose: true,
        targetEvent: $event,
        locals: {
          informative: null
        }
      });
    };

    return {
      list: list,
      create: create
    };
  }

})(angular);