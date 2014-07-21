angular.module('myApp', [])
    .controller('MyController',function($scope, $interpolate) {
        console.log( 'test 6' );
        $scope.$watch('emailBody', function(body) {
            if (body) {
                var template = $interpolate(body);
                $scope.previewText =
                    template({to: $scope.to});
            }
        });
    });
