(function() {
  'use strict';

  angular.module('icbApp').factory('Dialog', [
    '$mdDialog',
    '$sce',
    'marked',
    Dialog
  ]);

  function Dialog($mdDialog, $sce, marked) {
    const confirm = (text, $event) =>
      $mdDialog.show($mdDialog.confirm()
        .title("Confirmar")
        .htmlContent($sce.trustAsHtml(marked(text)))
        .ok("Sim")
        .cancel("Não")
        .targetEvent($event));

    return {
      confirm: confirm
    };

  }

})();