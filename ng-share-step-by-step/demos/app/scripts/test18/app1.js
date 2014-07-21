'use strict';

angular.module('myApp', []);

angular.module('myApp').controller('myController', function($scope){
    $scope.msg = 'hello';
    console.log($scope);

});
