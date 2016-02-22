((angular, lodash) => {
  'use strict';

  angular.module('icbApp').factory('lodash', [
    Lodash
  ]);

  function Lodash() {
    return lodash;
  }

})(angular, _);