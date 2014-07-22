'use strict';

/**
 * @ngdoc function
 * @name demosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demosApp
 */
angular.module('demosApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
