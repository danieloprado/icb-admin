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

          item.dates.forEach(date => {
            date.beginDate = new Date(date.beginDate);
            date.endDate = new Date(date.endDate);
          });

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
        const event = response.data;

        event.dates.forEach(date => {
          date.beginDate = new Date(date.beginDate);
          date.endDate = new Date(date.endDate);
        });

        return event;
      });
    };

    const remove = (id) => {
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