'use strict';

angular.module('myApp', [])
    .directive('myDirective', function() {
      return {
        restrict: 'A',
        scope: {}
      };
    });
