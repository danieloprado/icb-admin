(function() {
  'use strict';

  angular.module('icbApp').factory('Loader', [
    '$rootScope', ($rootScope) => {

      const promises = [];
      const messages = [];
      let disabled = 0;

      const emitChange = () => {
        const qtd = promises.length - disabled;

        $rootScope.$broadcast(qtd === 0
          ? 'loading-finished'
          : 'loading-started');
      };

      const obj = (target) => {
        const promise = target;
        promises.push(promise);

        promise. finally(() => {
          const index = promises.indexOf(promise);
          promises.splice(index, 1);

          emitChange();
        });

        emitChange();
        return promise;
      };

      obj.enable = () => {
        disabled--;
        emitChange();
      };

      obj.disable = () => {
        disabled++;
        emitChange();
      };

      return obj;
    }
  ]);

})();
