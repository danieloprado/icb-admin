((angular) => {
  'use strict';

  angular.module('icbInformative')
    .factory('informativeService', [
      'API',
      '$http',
      '$mdDialog',
      InformativeService
    ]);

  function InformativeService(API, $http, $mdDialog) {
    let endpoints = {
      list: API + '/informative/',
      save: API + '/informative/',
      remove: API + '/informative/remove'
    };

    const list = () => {
      return $http.get(endpoints.list).then((response) => {
        return response.data.map((item) => {
          if (item.date) {
            item.date = new Date(item.date);
          }

          return item;
        });
      });
    };

    const get = (id) => {
      return $http.get(`${API}/informative/${id}`).then(res => {
        res.data.date = new Date(res.data.date);
        return res.data;
      });
    };

    const save = (model) => {
      return $http.post(endpoints.save, model).then((response) => {
        if (response.data.date) {
          response.data.date = new Date(response.data.date);
        }

        return response.data;
      });
    };

    const remove = (id) => {
      return $http.post(endpoints.remove, {
        id
      });
    };

    return {
      list,
      get,
      save,
      remove
    };
  }

})(angular);