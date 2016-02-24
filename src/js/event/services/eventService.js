((angular) => {
  'use strict';

  angular.module('icbEvent')
    .factory('eventService', [
      'API',
      '$http',
      '$mdDialog',
      EventService
    ]);

  function EventService(API, $http, $mdDialog) {
    let endpoints = {
      list: API + '/event/',
      save: API + '/event/',
      remove: API + '/event/remove'
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

    const form = ($event, event) =>
      $mdDialog.show({
        templateUrl: 'views/event/form.html',
        controller: 'icbEvent.formCtrl',
        clickOutsideToClose: true,
        escapeToClose: true,
        targetEvent: $event,
        locals: {
          event: angular.copy(event || {})
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