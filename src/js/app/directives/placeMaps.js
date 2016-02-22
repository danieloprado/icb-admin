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
                          idkey="marker.id"></ui-gmap-marker>
          <ui-gmap-search-box template="searchbox.template" events="searchbox.events"></ui-gmap-search-box>
        </ui-gmap-google-map>`,
      controller: ['$scope', '$templateCache', ($scope, $templateCache) => {
        $scope.placeholder = $scope.placeholder || "Pesquisar";

        $scope.map = {
          center: {
            latitude: -23.9549052,
            longitude: -46.3306706
          },
          zoom: 14
        };

        $scope.options = {
          scrollwheel: false
        };

        $scope.marker = {
          id: 0,
          coords: {
            latitude: -23.9549052,
            longitude: -46.3306706
          },
          options: {
            draggable: true
          },
          events: {
            dragend: function(marker, eventName, args) {
              $scope.ngModel.lat = marker.getPosition().lat();
              $scope.ngModel.lng = marker.getPosition().lng();
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

              $scope.ngModel.lat = $scope.map.center.latitude = $scope.marker.coords.latitude = coords.lat;
              $scope.ngModel.lng = $scope.map.center.longitude = $scope.marker.coords.longitude = coords.lng;
              $scope.ngModel.address = place.formatted_address;
            }
          }
        };


      }]

    };
  }

})(angular);