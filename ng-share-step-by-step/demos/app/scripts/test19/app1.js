'use strict';

angular.module('myApp', []);

angular.module('myApp').controller('myController', function($scope, $timeout) {
    console.log(this);
    $scope.msg = 'Hello, World';
    $timeout(function() {
        console.log('--------$timeout----------');
        console.log(this);
        console.log(arguments);
        $scope.msg = 'How do you do?';
    }, 2000);

});
