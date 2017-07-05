var appRoot = angular.module('thermoApp', ['ngRoute', 'ngResource', 'ngRadialGauge', 'angular-dygraphs']);

appRoot
	.config(['$routeProvider', function ($routeProvider) {
    	 $routeProvider
			 .when('/',
				 {templateUrl: '/partial/home.html', controller: 'homeController'})
			 .when('/homeRPI',
				 {templateUrl: '/partial/homeRPI.html', controller: 'homeController'})
			 .when('/homeBBB',
				 {templateUrl: '/partial/homeBBB.html', controller: 'homeController'})
			 .when('/setup',
				 {templateUrl: '/partial/setup.html', controller: 'setupController'})
			 .when('/setupRPI',
				 {templateUrl: '/partial/setupRPI.html', controller: 'setupController'})
			 .when('/setupBBB',
				 {templateUrl: '/partial/setupBBB.html', controller: 'setupController'})
             .when('/manualRPI',
                 {templateUrl: '/partial/manualRPI.html', controller: 'manualController'})
			 .otherwise({redirectTo: '/'});
	}]);