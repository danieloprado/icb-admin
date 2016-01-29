(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .run([
      '$location',
      function($location) {
        $location.path("/login");
      }
    ]);

})(angular);