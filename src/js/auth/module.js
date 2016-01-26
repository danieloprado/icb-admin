(function(angular) {
  'use strict';

  angular.module('icbAuth', [
      'ngRoute'
    ])
    .constant('API', 'http://localhost:3000/api');

})(angular);