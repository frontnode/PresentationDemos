'use strict';

/**
 * @ngdoc function
 * @name demosApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the demosApp
 */
angular.module('demosApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
