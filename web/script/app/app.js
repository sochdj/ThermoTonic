var appRoot = angular.module('thermoApp', ['ngRoute', 'ngResource', 'ngRadialGauge', 'chart.js']);

appRoot
	.config(['$routeProvider', 'ChartJsProvider', function ($routeProvider, ChartJsProvider) {
    	 $routeProvider
			 .when('/',
				 {templateUrl: '/partial/home.html', controller: 'homeController'})
			 .when('/setup',
				 {templateUrl: '/partial/setup.html', controller: 'setupController'})
            .otherwise({ redirectTo: '/' });

		ChartJsProvider.setOptions('Line', {animation: true, showTooltips: true});
    }]);