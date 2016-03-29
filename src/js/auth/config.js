(function(angular) {
  'use strict';

  angular.module('icbAuth')
    .config(['$httpProvider', configInterceptor]);

  function configInterceptor($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }

})(angular);