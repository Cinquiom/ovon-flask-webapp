'use strict';

var OpportunitiesController = function($scope, $http, $location, $route, api) {
	
	// Specifying simple JSON objects in the javascript itself
	$scope.filters = ["Manual Labour", "People", "Animals"];
	$scope.title = "Opportunities";
	
	$scope.linkToEnterVolunteerPool = function() {
		$location.path("/createvolunteerpost");
		$route.reload();
	}
	
	$scope.linkToPostOpportunity = function() {
		$location.path("/createopportunitypost");
		$route.reload();
	}
	
	// Typically how we will be pulling data, except
	// the URL will be a REST endpoint with a dynamically-generated
	// JSON object at that location
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	$http.get(api.postOpportunity).then(function(response) {
		$scope.ops = response.data;
	});
};
