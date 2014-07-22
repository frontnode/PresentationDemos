Angular.js
=========


## 理论

构建UI要是声明式的

## Modules

- Keeping our global namespace clean
- Making tests easier to write and keeping them clean so as to more easily target isolated
functionality
- Making it easy to share code between applications
- Allowing our app to load different parts of the code in any order


```javascript
    //set
    angular.module('myApp', [])
    //get
    angular.module('myApp')
```


## Scope

The scopes of the application refer to the application model. Scopes are the execution context for expressions.
Scopes serve as the glue between the controller and the view.

what can scope do

- They provide observers to watch for model changes
- They provide the ability to propagate model changes through the application as well as outside the system to other components
- They can be nested such that they can isolate functionality and model propertie
- They provide an execution environment in which expressions are evaluated


### $rootscope

When Angular starts to run and generate the view, it will create a binding from the root ng-app element to the $rootScope . This $rootScope is the eventual parent of all $scope objects.


### $scope Lifecycle

When the browser receives a JavaScript callback that executes inside of the Angular execution context, the $scope will be made aware of the model mutation.

- creation
- linking
- updating
- destruction


## controllers


### Controller Hierarchy (Scopes Within Scopes)

Every part of an AngularJS application has a parent scope (as we’ve seen, at the ng-app level, this scope is called the $rootScope ), regardless of the context within which it is rendered.

With the exception of isolate scopes, all scopes are created with prototypal inheritance, meaning that they have access to their parent scopes.

By default, for any property that AngularJS cannot find on a local scope, AngularJS will crawl up to the containing (parent) scope and look for the property or method there. If AngularJS can’t find the property there, it will walk to that scope’s parent and so on and so forth until it reaches the Controllers $rootScope . If it doesn’t find it on the $rootScope , then it moves on and is unable to update the
view

`test3.html`


## Expressions

The `{{ }}` notation for showing a variable attached to a $scope is actually an expression: {{ expression }} . When setting up a $watch , we use an expression (or a function) that Angular will evaluate.

- All expressions are executed in the context of the scope and have access to local $scope
variables.
- An expression doesn’t throw errors if it results in a TypeError or a ReferenceError.
- They do not allow for any control flow functions (conditionals; e.g., if/else).
- They can accept a filter and/or filter chains.

### Parsing an Angular Expression
Although your Angular app will run parse for you automatically when running the $digest loop, sometimes it’s useful to parse an Angular expression manually.

`test4.html`

#### Interpolating a String

To modify the beginning string, we can set the starting symbol with the startSymbol() method.
The startSymbol() takes a single argument:
• value (string) - the value to set the starting symbol
To modify the ending symbol, we can use the endSymbol() function. This function takes a single
argument, as well:
• value (string) - the value to set the end symbol
To modify the starting symbol, we can create a new module and inject the $interpolateProvider
into the config() function.

`test5.html`

## Filter

Filter provides a way to format the data we display to the user.

`test6.html`


### form validation

<input type="text" ng-minlength=5 />
<input type="text" ng-maxlength=20 />
<input type="text" ng-pattern="/a-zA-Z/" />

<!--type = email -->
<input type="email" name="email" ng-model="user.email" />

to validate that an input represents a URL, set the input type to url :
<input type="url" name="homepage" ng-model="user.facebook_url" />


## Directives

Custom HTML Elements and Attributes

### restrict

``` javascript
E A C M
```


```
ng-href
ng-src
ng-disabled
ng-checked
ng-readonly
ng-selected
ng-class
ng-style


```


```
ng-disabled
ng-checked


```
### ng-repeat

$index: iterator offset of the repeated element (0..length-1)
$first: true if the repeated element is first in the iterator
$middle: true if the repeated element is between the first and last in the iterator
$last: true if the repeated element is last in the iterator
$even: true if the iterator position $index is even (otherwise false)
$odd: true if the iterator position $index is odd (otherwise false)

### ng-switch

`test9.html`




### ng-init

Use ng-init to set up state inside the scope of a directive when that directive is invoked.

`test10.html`


### ng-bind

`ng-bind` is `{{}}`


### ng-cloak

`test11.html`

### ng-model

The ng-model directive binds an input, select, textarea, or custom form control to a property on the surrounding scope.


### ng-show/ng-hide

### ng-change

### ng-form

`test12.html`

### ng-submit



### select

Use the ng-select directive to bind data to an HTML <select> element. This directive can be used in conjunction with ng-model and ng-options to provide sophisticated and highly performant dynamic forms.


## deep directive

### scope
`scope` isolate scope`{}`

### transclude

`test16.html`


### controller

function($scope, $element, $attrs, $transclude){};

`$scope` The current scope associated with the directive element.
`$element` The current element directive element.
`$attrs` The attributes object for the current element.
`$transclude` A transclude linking function pre-bound to the correct transclusion scope.
n


## dirty check





## read the code




### publishExternalAPI

在`angular`这个obj上绑定一系列方法


### angularInit



### bootstrap


    bootstrap(appElement, module ? [module] : []);

### annotate 注解

annotate

angular.module("cp").controller(['$rootscope', '$scope', '$timeout', function( $rootscope, $scope, $timeout)]);

var fnText = fn.toString().replace(STRIP_COMMENTS, '');

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;

### $provider

privider ("name", {$get:{}});


privider ("name", function() {
    this.$get = {};

});

$LocaleProvider

    angularModule('ngLocale', []).provider('$locale', $LocaleProvider);



provider


  jqLite(document).ready(function() {
    angularInit(document, bootstrap);
  });



config 也是个invokerLater

        var config = invokeLater('$injector', 'invoke');


config方法，
angular.module("hello",[]).config()

angular.module("hello",[], [configFun])


## $scope


    function Scope() {
      this.$id = nextUid();
      this.$$phase = this.$parent = this.$$watchers =
                     this.$$nextSibling = this.$$prevSibling =
                     this.$$childHead = this.$$childTail = null;
      this['this'] = this.$root =  this;
      this.$$destroyed = false;
      this.$$asyncQueue = [];
      this.$$postDigestQueue = [];
      this.$$listeners = {};
      this.$$listenerCount = {};
      this.$$isolateBindings = {};
    }

    $scope.prototype = {
        $watch
        $watchGroup
        $watchCollection
    };


$scope.$$watchers = [];


每一次 "$apply()"就会调用$scope.digist();
model更是如此


#### $scope.$emit

    namedListeners[i].apply(null, listenerArgs);
    scope = scope.$parent;


### $scope.$broadcast
