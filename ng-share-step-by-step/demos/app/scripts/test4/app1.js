angular.module("myApp", [])
    .controller('MyController',function($scope, $parse) {
        $scope.$watch('expr', function(newVal, oldVal, scope) {
            console.log('change');
            if (newVal !== oldVal) {
                // Let's set up our parseFun with the expression
                var parseFun = $parse(newVal);
                console.log(parseFun);
                // Get the value of the parsed expression
                $scope.parsedValue = parseFun(scope);
            }
        });
    });
