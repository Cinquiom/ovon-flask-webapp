'use strict';

var OpportunitiesController = function($scope, $http) {
	
	// Specifying simple JSON objects in the javascript itself
	$scope.filters = ["Manual Labour", "People", "Animals"];
	$scope.title = "Opportunities";
	
	// Typically how we will be pulling data, except
	// the URL will be a REST endpoint with a dynamically-generated
	// JSON object at that location
	$http.get('json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	$http.get('json/opportunities.json').then(function(response) {
		$scope.ops = response.data;
	});
};
