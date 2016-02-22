((angular) => {
  'use strict';

  angular.module('icbApp')
    .directive('icbLoading', [IcbLoading]);

  function IcbLoading() {

    return {
      restrict: 'E',
      scope: true,
      template: `
      <div ng-if="!hide">
        <md-progress-circular
            md-diameter="120" 
            md-mode="indeterminate">
        </md-progress-circular>
      </div>`,
      link: (scope) => {
        scope.hide = true;

        scope.$on('loading-started', function() {
          scope.hide = false;
        });

        scope.$on('loading-finished', function() {
          scope.hide = true;
        });

      }
    };

  }

})(angular);