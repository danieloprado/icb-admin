(function() {
    'use strict';

    angular.module('App')
    .controller('App.LoginCtrl', ['$scope', 'loginService', ctrl]);

    function ctrl($scope, loginService) {

        $scope.user = {};

        $scope.login = function() {
            loginService.doLogin($scope.user).then(function(data) {
                //alert('ok');
            });
        };

        $scope.cancel = loginService.cancel;

    }

})();
