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
	
	$scope.onOrganizationRating = function(rating, org_id) {

		if (rating > 0) {
			var ratingObject = JSON.stringify({rating: rating});
			$http.post(api.organizationRating + org_id + '/', ratingObject)
		 	.then(
	          function (response) {
	              alert("Thank you for your rating!");
	          });
		}
		else {
			$http.delete(api.organizationRating + org_id + '/')
			.then(
				function (response) {
					if (response.data != "noRating") {
						alert("Your rating has been removed");
					}
					else {
						alert("You have no rating to remove");
					}
					
				});
		}
		

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
