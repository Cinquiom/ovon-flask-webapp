'use strict';

var VolunteerPoolController = function($scope, $http) {
	
	// Specifying simple JSON objects in the javascript itself
	$scope.filters = ["Manual Labour", "People", "Animals"];
	$scope.title = "Volunteers";
	
	// Typically how we will be pulling data, except
	// the URL will be a REST endpoint with a dynamically-generated
	// JSON object at that location
	$http.get('json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	$http.get('json/volunteers.json').then(function(response) {
		$scope.volunteers = response.data;
	});
};
