((angular) => {
  'use strict';

  angular.module('icbEvent').controller("icbEvent.formCtrl", [
    '$scope',
    '$filter',
    '$mdDialog',
    'lodash',
    'Loader',
    'Toast',
    'event',
    'eventService',
    FormCtrl
  ]);

  function FormCtrl($scope, $filter, $mdDialog, _, Loader, Toast, event, service) {
    const model = $scope.model = event || {};
    model.dates = model.dates || [{}];
    $scope.editing = !_.isEmpty($scope.model);

    model.dates.forEach(item => {
      if (_.isEmpty(item)) return;

      item.begin = $filter('date')(item.beginDate, 'HH:mm');
      item.end = $filter('date')(item.endDate, 'HH:mm');

      item.beginDate.setHours(0);
      item.beginDate.setMinutes(0);
      item.date = item.beginDate;
    });

    $scope.addDate = () => {
      model.dates.push({});
    };

    $scope.removeDate = (date) => {
      if (model.dates.length == 1) return;
      _.remove(model.dates, x => x == date);
    };

    $scope.submit = () => {
      var data = angular.copy(model);

      data.dates = model.dates.map(dateInfo => {
        const toDate = (hour) => {
          let date = angular.copy(dateInfo.date);
          const parts = hour.split(":");

          date.setHours(parts[0]);
          date.setMinutes(parts[1]);

          return date;
        };

        return {
          beginDate: toDate(dateInfo.begin),
          endDate: toDate(dateInfo.end)
        };
      });

      Loader(service.save(data))
        .then((event) => {
          Toast("Salvo");
          $mdDialog.hide(event);
          $scope.model = {};
        }).catch((res) => Toast.httpHandler(res));
    };

  }

})(angular);