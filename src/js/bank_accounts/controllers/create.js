(function() {
    'use strict';

    angular.module('BankAccount')
    .controller('BankAccount.CreateCtrl', ['$scope', 'BankAccount', 'BankAccount.CreateModal', ctrl]);

    function ctrl($scope, BankAccount, createModal) {
        $scope.account = {};

        $scope.save = function() {

            BankAccount.create($scope.account).then(function(data) {
                //alert('ok');
            });

        };

        $scope.cancel = createModal.cancel;
    }

})();
