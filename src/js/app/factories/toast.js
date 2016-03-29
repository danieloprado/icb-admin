(angular => {
  'use strict';

  angular.module('icbApp')
    .factory('Toast', ['$mdToast', service]);

  function service($mdToast) {

    const Toast = function(message) {
      $mdToast.show($mdToast.simple().textContent(message).position("top right"));
    };

    Toast.genericError = () => Toast("Que vergonha! Aconteceu um erro inesperado...");
    Toast.userChanged = () => Toast("O usuário foi alterado, seu trabalho não foi salvo.");

    Toast.httpHandler = (res) => {
      switch (res.status) {
        case 400:
          Toast(res.data.message);
          break;
        case 401:
          Toast.userChanged();
          break;
        default:
          Toast.genericError();
      }
    };

    return Toast;
  }

})(angular);