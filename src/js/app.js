(function() {
  'use strict';

  var app = angular.module('cashFlow', [
    'ngMaterial',
    'ngMdIcons',
    'md.data.table',
    'ngRoute',
    'App'
  ]);

  app.constant('API', 'http://localhost:3000/api');

})();