(function() {
  'use strict';

  angular.module('BankAccount')
  .factory('BankAccount.CreateModal', ['API', 'cfHttp', '$mdDialog', loginService]);

  function loginService(API, cfHttp, $mdDialog) {

    var dialog;

    var endpoints = {
      login: API + '/auth/login'
    };

    function open($event) {
      dialog = $mdDialog.show({
         templateUrl: '/view/bank-account/create.html',
         controller: 'BankAccount.CreateCtrl',
         clickOutsideToClose: true,
         escapeToClose: true
      });
    }

    return {
      open: open,
      cancel: function() {
        $mdDialog.cancel(dialog);
      },
      doLogin: function(credentials) {
        return cfHttp.post(endpoints.login, credentials).then(function() {
          $mdDialog.cancel(dialog);
        });
      }
    };

  }

})();
