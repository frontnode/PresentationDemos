'use strict';

angular.module('myApp', []);
angular.module('myApp').controller('CityController', function($scope) {
    $scope.cities = [
        {name: 'Seattle'},
        {name: 'San Francisco'},
        {name: 'Chicago'},
        {name: 'New York'},
        {name: 'Boston'}
    ];
});
