var appRoot = angular.module('thermoApp', ['ngRoute', 'ngResource', 'ngRadialGauge', 'angular-dygraphs']);

appRoot
	.config(['$routeProvider', function ($routeProvider) {
    	 $routeProvider
			 .when('/',
				 {templateUrl: '/partial/home.html', controller: 'homeController'})
			 .when('/setup',
				 {templateUrl: '/partial/setup.html', controller: 'setupController'})
			 .when('/homeInside',
				 {templateUrl: '/partial/homeInside.html', controller: 'homeInsideCtrl'})
			 .otherwise({redirectTo: '/'});
	}]);