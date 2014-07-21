var app = angular.module('myApp', []);

app.filter('myfilter', function() {
        return function(input, length) {
            console.log( arguments);
            var len = parseInt(length, 10);
            var result = "";
            input.forEach(function(v, i){
                console.log(v);
                result += '---' + v.slice(0, len);
            });
            return result;
        };
    });
