(angular => {
  'use strict';

  angular.module('icbApp')
    .factory('Toast', ['$mdToast', service]);

  function service($mdToast) {

    return message => $mdToast.show($mdToast.simple().textContent(message).position("top right"));

  }

})(angular);