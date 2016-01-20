(function() {
  'use strict';

  angular.module('App')
  .factory('loginService', ['API', 'cfHttp', '$mdDialog', loginService]);

  function loginService(API, cfHttp, $mdDialog) {

    var dialog;

    var endpoints = {
      login: API + '/auth/login'
    };

    function login($event) {
      dialog = $mdDialog.show({
         templateUrl: '/view/app/login-modal.html',
         controller: 'App.LoginCtrl',
         clickOutsideToClose: true,
         escapeToClose: true
      });
    }

    return {
      login: login,
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
