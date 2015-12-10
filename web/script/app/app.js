var appRoot = angular.module('thermoApp', ['ngRoute', 'ngResource','ngRadialGauge']);

appRoot
    .config(['$routeProvider', function ($routeProvider) {
    	 $routeProvider
            .when('/', 
            	{ templateUrl: '/partial/home.html', 
            	controller: 'homeController' })
            .when('/setup', 
            	{ templateUrl: '/partial/setup.html', 
            	controller: 'setupController' })
            .otherwise({ redirectTo: '/' });

    }]);