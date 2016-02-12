(angular => {
  'use strict';

  angular.module('icbApp')
    .factory('Toast', ['$mdToast', service]);

  function service($mdToast) {

    var obj = function(message) {
      $mdToast.show($mdToast.simple().textContent(message).position("top right"));
    };

    obj.genericError = () => obj("Que vergonha! Aconteceu um erro inesperado...");

    return obj;
  }

})(angular);