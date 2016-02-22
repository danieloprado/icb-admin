((angular) => {
  'use strict';

  angular.module('icbApp')
    .directive('icbPlaceMaps', [IcbPlaceMaps]);

  function IcbPlaceMaps() {

    return {
      restrict: 'E',
      scope: {
        ngModel: "=",
        placeholder: "@"
      },
      template: `
        <md-progress-circular
            md-diameter="100"
            md-mode="indeterminate">
        </md-progress-circular>
        <ui-gmap-google-map center="map.center" zoom="map.zoom" options="options">
          <ui-gmap-marker coords="marker.coords"
                          options="marker.options"
                          events="marker.events"
                          idkey="marker.id" />

          <ui-gmap-search-box template="searchbox.template" events="searchbox.events" />
        </ui-gmap-google-map>`,

      controller: ['$scope', '$templateCache', '$q', 'lodash', 'Toast', 'Loader', Controller]
    };
  }

  function Controller($scope, $templateCache, $q, _, Toast, Loader) {
    $scope.placeholder = $scope.placeholder || "Pesquisar";
    $scope.ngModel = $scope.ngModel || {};

    const initialValue = {
      latitude: $scope.ngModel.lat || -23.9549052,
      longitude: $scope.ngModel.lng || -46.3306706,
    };

    const updateValue = (value) => {
      console.trace(value);
      if (_.isEmpty(value)) {
        value = {
          lat: -23.9549052,
          lng: -46.3306706,
        };
      }

      $scope.ngModel.lat = $scope.map.center.latitude = $scope.marker.coords.latitude = value.lat;
      $scope.ngModel.lng = $scope.map.center.longitude = $scope.marker.coords.longitude = value.lng;
      $scope.ngModel.address = value.address;
    };

    $scope.map = {
      center: angular.copy(initialValue),
      zoom: 14
    };

    $scope.options = {
      scrollwheel: false
    };

    $scope.marker = {
      id: 0,
      coords: angular.copy(initialValue),
      options: {
        draggable: true
      },
      events: {
        dragend: function(marker, eventName, args) {
          const deferred = $q.defer();

          (new google.maps.Geocoder()).geocode({
            location: marker.getPosition()
          }, (results, status) => {
            if (status != google.maps.GeocoderStatus.OK) {
              deferred.reject(results);
              return;
            }

            deferred.resolve(results[0]);
          });

          Loader(deferred.promise)
            .then((address) => {
              updateValue({
                lat: marker.getPosition().lat(),
                lng: marker.getPosition().lng(),
                address: address.formatted_address
              });
            })
            .catch((error) => {
              Toast("Não foi possivel achar o endereço");
            });

        }
      }
    };

    $templateCache.put('icbPlaceMapsSearchBox',
      `<input type="text" class="ng-scope" placeholder="${$scope.placeholder}">`);

    $scope.searchbox = {
      template: 'icbPlaceMapsSearchBox',
      events: {
        places_changed: (searchBox) => {
          let places = searchBox.getPlaces();

          if (places.length === 0) {
            return;
          }

          let place = places[0];
          let coords = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };

          updateValue({
            lat: coords.lat,
            lng: coords.lng,
            address: place.formatted_address
          });

        }
      }
    };

    $scope.$watch("ngModel", updateValue, true);
  }

})(angular);