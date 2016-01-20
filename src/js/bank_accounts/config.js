(function() {
  'use strict';

  var viewPath = '/view/bank-account';

  angular.module('BankAccount', [])

  .config(['$routeProvider', configRouter]);

  function configRouter($routeProvider) {
    $routeProvider

    .when('/bank_account/', {
      controller: 'BankAccount.IndexCtrl',
      templateUrl: viewPath + '/index.html'
    });

  }

})();
