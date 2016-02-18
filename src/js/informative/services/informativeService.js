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
      save: API + '/informative/',
      remove: API + '/informative/remove'
    };

    const list = () => {
      return $http.get(endpoints.list).then((response) => {
        return response.data.map((item) => {
          if (item.date) {
            item.date = new Date(item.date);
          }

          return item;
        });
      });
    };

    const form = ($event, informative) =>
      $mdDialog.show({
        templateUrl: 'views/informative/form.html',
        controller: 'icbInformative.formCtrl',
        clickOutsideToClose: true,
        escapeToClose: true,
        targetEvent: $event,
        locals: {
          informative: angular.copy(informative || {})
        }
      });

    const save = (model) => {
      return $http.post(endpoints.save, model).then((response) => {
        if (response.data.date) {
          response.data.date = new Date(response.data.date);
        }

        return response.data;
      });
    };

    const remove = (id) => {
      console.log(id);
      return $http.post(endpoints.remove, {
        id
      });
    };

    return {
      list: list,
      form: form,
      save: save,
      remove: remove
    };
  }

})(angular);