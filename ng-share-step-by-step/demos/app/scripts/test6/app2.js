'use strict';

var app = angular.module('myApp', []);
app.controller('MyController', ['$scope', '$filter',
                                  function($scope) {
                                      $scope.today = new Date();
                                  }]);
