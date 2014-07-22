'use strict';

angular.module('myApp', []);
angular.module('myApp').controller('SomeCtrl', function($scope) {
    // we can leave it empty, it just needs to be defined
}).controller('SecondCtrl', function($scope) {
        // also can be empty
    }).directive('myDirective', function() {
        return {
            restrict: 'A',
            scope: true
        };
    });
