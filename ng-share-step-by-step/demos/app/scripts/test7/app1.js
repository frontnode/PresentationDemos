'use strict';

angular.module('myApp', [])
    .run(function($rootScope, $timeout) {
        $rootScope.isDisabled = true;
        $timeout(function() {
            $rootScope.isDisabled = false;
        }, 5000);
    });
