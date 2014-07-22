'use strict';
angular.module('myApp', []).controller('SomeController', function($scope) {

    $scope.someBareValue = 'hello computer';

    $scope.someAction = function() {
        $scope.someBareValue = 'hello human, from parent';
    };
})
    .controller('ChildController', function($scope) {
        $scope.childAction = function() {
            $scope.someBareValue = 'hello human, from child';
        };
    });
