(function() {
  'use strict';

  angular.module('BankAccount')
  .directive('cfAccountCreate', ['BankAccount.CreateModal', directive]);

  function directive(modalService) {
    return {
      restrict: 'EA',
      scope: false,
      link: function(scope, element, attrs) {
        element.on('click', function() {
          modalService.open();
        });
      }
    };
  }

})();
