(function() {
  'use strict';

  angular.module('icbApp')
    .factory('Loader', ['$rootScope', ($rootScope) => {

      const promises = [];
      const messages = [];

      const emitChange = () => {
        $rootScope.$broadcast(promises.length === 0 ?
          'loading-finished' :
          'loading-started');
      };

      const obj = (target) => {
        const promise = target;
        promises.push(promise);

        promise.finally(() => {
          const index = promises.indexOf(promise);
          promises.splice(index, 1);

          emitChange();
        });

        emitChange();
        return promise;
      };

      obj.enable = () => {
        $rootScope.$broadcast('loading-started');
      };

      obj.disable = () => {
        $rootScope.$broadcast('loading-finished');
      };

      return obj;
    }]);


})();