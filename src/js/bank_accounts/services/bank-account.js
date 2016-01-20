(function() {
  'use strict';

  angular.module('BankAccount')
  .factory('BankAccount', ['API', 'cfHttp', BankAccount]);

  function BankAccount(API, cfHttp) {

    var endpoints = {
      list: API + '/bank_account',
      create: API + '/bank_account'
    };

    var listPromise;

    function refreshList() {
        listPromise = cfHttp.get(endpoints.list).then(function(data) {
            return data.data;
        });
    }

    function list() {
        if (!listPromise) {
            refreshList();
        }
        return listPromise;
    }

    function create(account) {
        return cfHttp.post(endpoints.create, account).then(function(data) {
            return data.data;
        });
    }

    return {
        refreshList: refreshList,
        list: list,
        create: create
    };
  }

})();
