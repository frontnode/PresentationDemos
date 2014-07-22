'use strict';

angular.module('myApp', [])
    .controller('SomeController', function($scope) {
        // best practice, always use a model
        $scope.someModel = {
            someValue: 'hello computer'
        };
        $scope.someAction = function() {
            $scope.someModel.someValue = 'hello human, from parent';
        };
    })
    .controller('ChildController', function($scope) {
        $scope.childAction = function() {
            $scope.someModel.someValue = 'hello human, from child';
        };
    });

