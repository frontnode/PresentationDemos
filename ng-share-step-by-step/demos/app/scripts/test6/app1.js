var app = angular.module('myApp', []);
app.controller('DemoController', ['$scope', '$filter',
                                  function($scope, $filter) {
                                      $scope.name = $filter('lowercase')('Ari');
                                  }]);
