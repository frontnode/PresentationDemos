function MyController($scope) {
    $scope.clock = new Date();
    var updateClock = function() {
        $scope.clock = new Date();
    };
    setInterval(function() {
        console.log("helloo");
        updateClock();
    }, 1000);
    updateClock();
};

/*
function MyController($scope) {
    $scope.clock = {
        now: new Date()
    };
    var updateClock = function() {
        $scope.clock.now = new Date();
    };
    setInterval(function() {
        $scope.$apply(updateClock);
    }, 1000);
    updateClock();
};
*/
