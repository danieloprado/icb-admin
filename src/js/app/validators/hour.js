((angular) => {
  'use strict';

  angular.module('icbApp')
    .directive('hour', ['lodash', Hour]);

  function Hour(_) {

    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.$validators.hour = (modelValue, viewValue) => {
          return _.isEmpty(modelValue) || /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(viewValue);
        };
      }
    };

  }

})(angular);