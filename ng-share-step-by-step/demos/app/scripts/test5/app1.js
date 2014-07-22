angular.module('myApp', [])
    .controller('MyController',function($scope, $interpolate) {
        // Set up a watch
        console.log( 'test 5' );
        $scope.$watch('emailBody', function(body) {
            if (body) {
                var template = $interpolate(body);
                $scope.previewText =
                    template({to: $scope.to});
            }
        });
    });
