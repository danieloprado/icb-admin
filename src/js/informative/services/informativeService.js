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
      list: API + '/informative/',
      save: API + '/informative/'
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

    const save = (model) => {
      return $http.post(endpoints.save, model).then(function(response) {
        return response.data;
      });
    };

    return {
      list: list,
      create: create,
      save: save
    };
  }

})(angular);