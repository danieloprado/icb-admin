(function(angular) {
  'use strict';

  angular.module('icbApp')
    .config(['$mdThemingProvider', configTheme]);

  function configTheme($mdThemingProvider, $translateProvider) {
    var customPrimary = {
      '50': '#6c8a99',
      '100': '#617d8b',
      '200': '#56707c',
      '300': '#4c626d',
      '400': '#41545e',
      '500': '#37474F',
      '600': '#2d3940',
      '700': '#222c31',
      '800': '#181e22',
      '900': '#0d1113',
      'A100': '#7c96a3',
      'A200': '#8ba2ae',
      'A400': '#9aaeb8',
      'A700': '#030304'
    };
    $mdThemingProvider
      .definePalette('customPrimary',
        customPrimary);

    var customAccent = {
      '50': '#65ab72',
      '100': '#579f65',
      '200': '#4e8e5a',
      '300': '#457e50',
      '400': '#3c6d45',
      '500': '#335D3B',
      '600': '#2a4d31',
      '700': '#213c26',
      '800': '#182c1c',
      '900': '#0f1b11',
      'A100': '#75b481',
      'A200': '#86bd90',
      'A400': '#96c69f',
      'A700': '#060b07'
    };
    $mdThemingProvider
      .definePalette('customAccent',
        customAccent);

    var customWarn = {
      '50': '#f4a8a6',
      '100': '#f1928f',
      '200': '#ee7b79',
      '300': '#eb6562',
      '400': '#e84f4c',
      '500': '#e53935',
      '600': '#e2231e',
      '700': '#cd1e1a',
      '800': '#b61b17',
      '900': '#9f1815',
      'A100': '#f6bebd',
      'A200': '#f9d4d3',
      'A400': '#fceaea',
      'A700': '#891412'
    };
    $mdThemingProvider
      .definePalette('customWarn',
        customWarn);

    var customBackground = {
      '50': '#ffffff',
      '100': '#ffffff',
      '200': '#ffffff',
      '300': '#ffffff',
      '400': '#ffffff',
      '500': '#ffffff',
      '600': '#f2f2f2',
      '700': '#e6e6e6',
      '800': '#d9d9d9',
      '900': '#cccccc',
      'A100': '#ffffff',
      'A200': '#ffffff',
      'A400': '#ffffff',
      'A700': '#bfbfbf'
    };
    $mdThemingProvider
      .definePalette('customBackground',
        customBackground);

    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('customAccent')
      .warnPalette('customWarn')
      .backgroundPalette('customBackground');

    // $mdThemingProvider.theme('default')
    //   .primaryPalette('blue')
    //   .accentPalette('red');


  }

})(angular);