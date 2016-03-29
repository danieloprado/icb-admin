(function(angular) {
  'use strict';

  angular.module('icbEvent')
    .controller("icbEvent.listCtrl", [
      '$scope',
      'Dialog',
      'Toast',
      'eventService',
      ListCtrl
    ]);

  function ListCtrl($scope, dialog, Toast, service) {
    $scope.query = {
      order: "name"
    };

    $scope.dataPromise = service.list().then((data) => {
      $scope.events = data;
    });

    $scope.create = ($event) => {
      service.form($event).then((event) => {
        $scope.events.push(event);
      });
    };

    $scope.edit = ($event, event) => {
      service.form($event, event).then((newevent) => {
        angular.extend(event, newevent);
      });
    };

    $scope.delete = ($event, event, index) => {
      dialog.confirm(`Deseja apagar o evento **${event.name}**`, $event)
        .then(() => {
          $scope.events.splice(index, 1);
          service.remove(event._id).catch(() => {
            Toast(`Não foi possível apagar o evento **${event.name}**`);
            $scope.events.push(event);
          });
        });
    };
  }

})(angular);