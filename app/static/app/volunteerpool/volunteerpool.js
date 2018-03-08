'use strict';

var VolunteerPoolController = function($scope, $http, $location, api) {
	
	// Specifying simple JSON objects in the javascript itself
	$scope.filters = ["Manual Labour", "People", "Animals"];
	$scope.title = "Volunteers";
	
	$scope.chosenOrganization = {};
	$scope.chosenOrganizationName = {};
	$scope.userOrganizationNames = [];
	
	$scope.linkToEnterVolunteerPool = function() {
		$location.path("/createvolunteerpost");
		$route.reload();
	}
	
	//function to get user organization data for 'Browse As' dropdown
	$http.get(api.getUserOrganizations).then(function(response) {
		$scope.organizations = response.data;
		$scope.userOrganizationNames.push("volunteer");
		for (var i = 0; i < $scope.organizations.length; i++) {
			$scope.userOrganizationNames.push($scope.organizations[i].name);
		}
		
		$scope.chosenOrganizationName = $scope.userOrganizationNames[0];
	});
	
	$scope.onVolunteerRating = function(rating, volunteer_id) {
		//get the user's currently selected organization
		
		if ($scope.chosenOrganizationName == "volunteer") {
			
		}
		else {
			for (var i = 0; i < $scope.organizations.length; i++) {
				if ($scope.organizations[i].name == $scope.chosenOrganizationName) {
					$scope.chosenOrganization = $scope.organizations[i];
				}
			}
			var ratingObject = JSON.stringify({rating: rating});
			$http.put(api.volunteerRating + $scope.chosenOrganization.id + '/' + volunteer_id + '/', ratingObject)
		 	.then(
	          function (response) {
	              alert("Thank you for your rating!");
	          });
		}
	}
	
	// Typically how we will be pulling data, except
	// the URL will be a REST endpoint with a dynamically-generated
	// JSON object at that location
	$http.get('/static/json/navtop.json').then(function(response) {
		$scope.navtop = response.data;
	});
	
	$http.get(api.postVolunteerPool).then(function(response) {
		$scope.volunteers = response.data;
	});
};
