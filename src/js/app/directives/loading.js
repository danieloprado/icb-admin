(function() {
  'use strict';

  angular.module('App')
  .directive('cfLoading', ['cfHttp', cfLoading]);

  function cfLoading(cfHttp) {

    return {
      restrict: 'E',
      scope: true,
      template: '<div id="loading" ng-if="loading"><md-progress-circular class="" md-diameter="60" md-mode="indeterminate"></md-progress-circular></div>',
      link: function(scope, element, attrs) {

        scope.$on('loading-started', function() {
          scope.loading = true;
        });

        scope.$on('loading-finished', function() {
          scope.loading = false;
        });

      }
    };

  }

})();
