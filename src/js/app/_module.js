(function(angular) {
  'use strict';

  angular.module('icbApp', [
      'ngMaterial',
      'ngRoute',
      'icbAuth'
    ])
    .constant('API', 'http://localhost:3000/api');

})(angular);