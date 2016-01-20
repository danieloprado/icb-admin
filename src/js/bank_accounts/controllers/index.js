(function() {
    'use strict';

    angular.module('BankAccount')
    .controller('BankAccount.IndexCtrl', ['$scope', 'BankAccount', ctrl]);

    function ctrl($scope, BankAccount) {

        BankAccount.list().then(function(data) {
            $scope.accounts = data;
        });

    }

})();
